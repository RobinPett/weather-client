import { useEffect, useState } from 'react'
import { fetchUtils } from '../../services/index.js'
import PlatformsPieChart from '../visuals/PlatformsPieChart.js'
import Loader from '../info/Loader.js'
import { toast } from 'sonner'
import YearPicker from '../common/YearPicker.js'

/**
 * Platforms component.
 * 
 * @returns {JSX.Element} - The Platforms component.
 */
const Platforms = () => {
  const [platformData, setPlatformData] = useState(null)
  const [year, setYear] = useState(2000)
  const [loading, setLoading] = useState(false)

  // Fetch data when year changes
  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        setLoading(true)
        const data = await fetchUtils.getPlatforms(year)
        setPlatformData(await data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        const statusCode = error.response?.status
        toast.error(`Error fetching data: Status: ${statusCode}`)
      }
    }
    fetchPlatforms()
  }, [year])

  return (
    <div>
      <div className="year-picker" style={{ padding: '10px' }}>
        <YearPicker  updateYear={setYear} />
      </div>
      <h1 style={{ padding: '10px' }}>Most popular <b>platforms</b> in <b>{year}</b></h1>
      {platformData && <PlatformsPieChart data={platformData.games} />}
      {loading && <Loader blur={true} />}
    </div>
  )
}

export default Platforms