import { useEffect, useState } from 'react'
import { fetchUtils } from '../../services/index.js'
import Loader from '../info/Loader.js'
import { toast } from 'sonner'
import Heatmap from '../visuals/Heatmap.js'
import YearPicker from '../common/YearPicker.js'

/**
 * RatingsVsGenre component.
 * 
 * @returns {JSX.Element} - The RatingsVsGenre component.
 */
const RatingsVsGenre = () => {
  const [plotterData, setPlotterData] = useState(null)
  const [ratingObject, setRatingObject] = useState(null)
  const [loading, setLoading] = useState(false)
  const [year, setYear] = useState(2000)

  // Fetch data when year changes
  useEffect(() => {
    const createPlotterData = async () => {
      try {
        setLoading(true)
        const ratingObject = await fetchRating()
        setRatingObject(ratingObject)
                
        const genreData = await fetchGenres(year)

        const rawPlotterData = genreData.games.flatMap(game => 
          game.genres.map(genre => {
            const ratingKey = Object.keys(ratingObject).find(key => ratingObject[key] === game.rating?.text)
            return {
              genre,
              rating: parseInt(ratingKey) || Object.keys(ratingObject).length, // Fallback - Last rating = Rating pending
            }
          })
        )

        // Calculate frequencies
        const processedPlotterData = processData(rawPlotterData)

        setPlotterData(processedPlotterData)
        setLoading(false)
      }
      catch (error) {
        console.error('Error fetching data: ', error)
        toast.error('Error fetching data: ' + error)
      }
    }
    createPlotterData()
  }, [year])

  // Fetch ratings from API
  const fetchRating = async () => {
    const data = await fetchUtils.getRatings()
    const ratings = data.ratings
    const ratingObject = convertToObject(ratings)
    return ratingObject
  }

  // Fetch genres from API
  const fetchGenres = async (year) => {
    return await fetchUtils.getGenresAndRatings(year)
  }

  // Convert ratings to object
  const convertToObject = (ratings) => {
    const ratingObject = {}
    ratings.forEach((rating, index) => {
      ratingObject[index + 1] = rating.text
    })
    return ratingObject
  }

  // Process data to calculate frequencies
  const processData = (data) => {
    const frequencies = {}
    data.forEach(item => {
      const key = `${item.genre.name}-${item.rating}`
      frequencies[key] = (frequencies[key] || 0) + 1
    })

    const processedData = Object.entries(frequencies).map(([key, value]) => {
      const [genre, rating] = key.split('-')
      return {
        genre: genre,
        rating: parseInt(rating),
        frequency: value
      }
    })
    return processedData
  }

  return (
    <div>
      <div className="year-picker" style={{ padding: '10px' }}>
        <YearPicker updateYear={setYear} />
      </div>
      <h1 style={{ padding: '10px' }}>Comparing <b>genres</b> and  <b>ratings</b> of <b>{year}</b></h1>
      {plotterData && ratingObject && <Heatmap data={plotterData} ratings={ratingObject}/>}
      {loading && <Loader blur={true} />}
    </div>
  )
}

export default RatingsVsGenre