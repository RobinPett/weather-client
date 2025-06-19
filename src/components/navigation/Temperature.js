import { useEffect, useState } from 'react'
import { fetchUtils } from '../../services/index.js'
import GenreChart from '../visuals/GenreChart.js'
import Loader from '../info/Loader.js'
import DatePicker from '../common/DatePicker.js'
import { toast } from 'sonner'

/**
 * View genres component.
 * 
 * @returns {JSX.Element} - The Genres component.
 */
const Genres = () => {
  const [date, setDate] = useState(new Date())
  const [loading, setLoading] = useState(false)

  /**
   * Fetches genres by date.
   */
  // const fetchGenres = async () => {
  //   try {
  //     setLoading(true)
  //     const data = await fetchUtils.getGameGenres(date)
  //     setGenreData(await data)
  //     setLoading(false)
  //   } catch (error) {
  //     console.error('Error fetching data:', error)
  //     toast.error('Error fetching data')
  //   }
  // }

  return (
    <div>
      <div style={{ padding: '10px' }}>
        <DatePicker updateDate={setDate} />
      </div>
      {loading && <Loader blur={true} />}
    </div>
  )
}

export default Genres