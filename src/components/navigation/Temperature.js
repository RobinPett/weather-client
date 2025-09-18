import { use, useEffect, useState } from 'react'
import Loader from '../info/Loader.js'
import SingleDatePicker from '../common/SingleDatePicker.js'
import { toast } from 'sonner'
import { FetchService } from '../../services/FetchService.js'
import LineChart from '../visuals/LineChart.js'

/**
 * Fetch temperature and humidity data and display it in a chart.
 *
 * @returns {JSX.Element} - The Temperature component.
 */
const Temperature = () => {
  const [data, setData] = useState([])
  const [smhiData, setSmhiData] = useState([])
  const [mergeData, setMergeData] = useState([])
  const [loading, setLoading] = useState(false)
  const fetchService = new FetchService(process.env.REACT_APP_API_URL)
  const timeZone = 'Europe/Stockholm';


  const handleDateChange = async (date) => {
    console.log('Selected date:', date)
    const dateObj = date.toDate().toISOString().split('T')[0]
    console.log('Formatted date:', dateObj)
      setLoading(true)
      await fetchData(dateObj)
      await fetchSMHIData(dateObj)
      setLoading(false)
    }

  /**
   * Fetches temp and humidity by date.
   */
  const fetchData = async (date) => {
    try {
      const data = await fetchService.getTemperatureAndHumidity(date)
      setData(data)
      console.log('Fetched sensor data:', data)
    } catch (error) {
      console.error('Error fetching data:', error)
      toast.error('Error fetching data')
    }
  }

  /**
 * Fetches temp from smhi.
 */
  const fetchSMHIData = async (date) => {
    try {
      const smhiData = await fetchService.getSMHIData(date)
      console.log('Fetched SMHI data:', smhiData)
      const formattedData = smhiData.map(item => ({
        smhiTemperature: parseFloat(item.value),
        createdAt: new Date(item.date).toISOString(),
        source: 'SMHI'
      }))
      console.log('Formatted SMHI data:', formattedData)
      setSmhiData(formattedData)
    } catch (error) {
      console.error('Error fetching data:', error)
      toast.error('Error fetching SMHI data')
    }
  }

  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0]
    fetchData(currentDate)
    fetchSMHIData(currentDate)
  }, [])

  useEffect(() => {
      const mergeData = [
    ...data.map(d => ({
      createdAt: new Date(new Date(d.createdAt).toLocaleString('sv-SE', { timeZone })),
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
        <SingleDatePicker updateDate={handleDateChange} />
      </div>

      {mergeData && mergeData.length > 0 ? <LineChart data={mergeData} /> : <p>No data available</p>}
      {loading && <Loader blur={true} />}
    </div>
  )
}

export default Temperature