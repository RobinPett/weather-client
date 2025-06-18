import { useEffect, useState } from 'react'
import { fetchUtils } from '../../services/index.js'
import GenreChart from '../visuals/GenreChart.js'
import Loader from '../info/Loader.js'
import YearPicker from '../common/YearPicker.js'
import { toast } from 'sonner'

/**
 * View genres component.
 * 
 * @returns {JSX.Element} - The Genres component.
 */
const Genres = () => {
  const [genreData, setGenreData] = useState(null)
  const [year, setYear] = useState(2000)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchGenres()
  }, [year])

  /**
   * Fetches genres by year.
   */
  const fetchGenres = async () => {
    try {
      setLoading(true)
      const data = await fetchUtils.getGameGenres(year)
      setGenreData(await data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error)
      toast.error('Error fetching data')
    }
  }

  return (
    <div>
      <div style={{ padding: '10px' }}>
        <YearPicker updateYear={setYear} />
      </div>
      <h1 style={{ padding: '10px' }}>Most popular <b>genres</b> in <b>{year}</b></h1>
      {genreData && <GenreChart data={genreData.games} year={year}/> }
      {loading && <Loader blur={true} />}
    </div>
  )
}

export default Genres