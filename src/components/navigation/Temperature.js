import { useEffect, useState, useCallback } from 'react'
import Loader from '../info/Loader.js'
import SingleDatePicker from '../common/SingleDatePicker.js'
import { toast } from 'sonner'
import LineChart from '../visuals/LineChart.js'

/**
 * Fetch temperature and humidity data and display it in a chart.
 *
 * @returns {JSX.Element} - The Temperature component.
 */
const Temperature = ({ fetchService }) => {
  const [data, setData] = useState([])
  const [smhiData, setSmhiData] = useState([])
  const [mergeData, setMergeData] = useState([])
  const [loading, setLoading] = useState(false)
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
  const fetchData = useCallback(async (date) => {
    try {
      const data = await fetchService.getTemperatureAndHumidity(date)
      setData(data)
      console.log('Fetched sensor data:', data)
    } catch (error) {
      console.error('Error fetching sensor data:', error)
      toast.error('Error fetching sensor data')
    }
  }, [fetchService])

  /**
 * Fetches temp from smhi.
 */
  const fetchSMHIData = useCallback(async (date) => {
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
  }, [fetchService])

  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0]
    fetchData(currentDate)
    fetchSMHIData(currentDate)
  }, [fetchData, fetchSMHIData])

  useEffect(() => {
      const mergeData = [
    ...data.map(d => ({
      createdAt: new Date(new Date(d.createdAt).toLocaleString('sv-SE', { timeZone })),
      temperature: d.temperature,
      humidity: d.humidity,
      source: 'API'
    })),
    ...smhiData.map(d => ({
      createdAt: new Date(new Date(d.createdAt).toLocaleString('sv-SE', { timeZone })),
      smhiTemperature: d.smhiTemperature,
      source: 'SMHI'
    }))
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