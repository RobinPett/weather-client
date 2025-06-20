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
  const [loading, setLoading] = useState(false)
  const fetchService = new FetchService(process.env.REACT_APP_API_URL)

  const handleDateChange = async (date) => {
    const [from, to] = date
    if (from && to) {
      const fromDate = from.toDate().toISOString().split('T')[0] // Format date to YYYY-MM-DD
      const toDate = to.toDate().toISOString().split('T')[0] // Format date to YYYY-MM-DD
      const newDate = { from: fromDate, to: toDate }
      await fetchData(newDate)
    }
  }

  /**
   * Fetches temp and humidity by date.
   */
  const fetchData = async (date) => {
    try {
      setLoading(true)
      const data = await fetchService.getTemperatureAndHumidity(date)
      setData(await data)
      console.log('Fetched data:', data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error)
      toast.error('Error fetching data')
    }
  }

  return (
    <div>
      <div style={{ padding: '10px' }}>
        <DatePicker updateDate={handleDateChange} />
      </div>

      {data && data.length > 0 ? <LineChart data={data} /> : <p>No data available</p>}
      {loading && <Loader blur={true} />}
    </div>
  )
}

export default Temperature