import { use, useEffect, useState } from 'react'
import Loader from '../info/Loader.js'
import DatePicker from '../common/DatePicker.js'
import { toast } from 'sonner'
import { FetchService } from '../../services/FetchService.js'
import LineChart from '../visuals/LineChart.js'

/**
 * View genres component.
 * 
 * @returns {JSX.Element} - The Genres component.
 */
const Temperature = () => {
  const [data, setData] = useState([])
  const [smhiData, setSmhiData] = useState([])
  const [mergeData, setMergeData] = useState([])
  const [loading, setLoading] = useState(false)
  const fetchService = new FetchService(process.env.REACT_APP_API_URL)

  const handleDateChange = async (date) => {
    const [from, to] = date
    if (from && to) {
      const fromDate = from.toDate().toISOString().split('T')[0] // Format date to YYYY-MM-DD
      const toDate = to.toDate().toISOString().split('T')[0] // Format date to YYYY-MM-DD
      const newDate = { from: fromDate, to: toDate }
      setLoading(true)
      await fetchData(newDate)
      await fetchSMHIData()
      setLoading(false)
    }
  }

  /**
   * Fetches temp and humidity by date.
   */
  const fetchData = async (date) => {
    try {
      const data = await fetchService.getTemperatureAndHumidity(date)
      setData(await data)
      console.log('Fetched data:', data)
    } catch (error) {
      console.error('Error fetching data:', error)
      toast.error('Error fetching data')
    }
  }

  /**
 * Fetches temp from smhi.
 */
  const fetchSMHIData = async () => {
    try {
      const smhiData = await fetchService.getSMHIData()
      console.log('SMHI data:', smhiData)
      const formattedData = smhiData.value.map(item => ({
        temperature: parseFloat(item.value),
        createdAt: new Date(item.date).toISOString(),
        source: 'SMHI'
      })) 
      console.log('Formatted SMHI data:', formattedData)
      setSmhiData(formattedData)
      console.log('Fetched SMHI data:', data)
    } catch (error) {
      console.error('Error fetching data:', error)
      toast.error('Error fetching SMHI data')
    }
  }

  useEffect(() => {
      const mergeData = [
    ...data.map(d => ({
      createdAt: d.createdAt,
      temperature: d.temperature,
      humidity: d.humidity,
      source: 'API'
    })),
    ...smhiData
  ]
      setMergeData(mergeData)
  }, [data, smhiData])

  return (
    <div>
      <div style={{ padding: '10px' }}>
        <DatePicker updateDate={handleDateChange} />
      </div>

      {mergeData && mergeData.length > 0 ? <LineChart data={data} /> : <p>No data available</p>}
      {loading && <Loader blur={true} />}
    </div>
  )
}

export default Temperature