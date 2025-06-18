import { useEffect, useState, useRef } from 'react'
import * as echarts from 'echarts'
import SlideSwitch from '../common/SlideSwitch.js'
import ListGames from './ListGames.js'

/**
 * Displays a GenreChart component.
 * 
 * @param {Array|Object} data - The data to be displayed in the chart.
 * @param {Array|Object} year - The year for which the data is displayed.
 * @returns {JSX.Element} - The GenreChart component.
 */
const GenreChart = ({ data, year }) => {
  const [sort, setSort] = useState(false)
  const [clickedGenre, setClickedGenre] = useState(null)
  const chartRef = useRef(null)

  /**
   * Sorts the data based on the counts of genres.
   *
   * @param {*} genres 
   * @param {*} counts 
   * @returns 
   */
  const sortData = (genres, counts) => {
    const combined = genres.map((genre, index) => ({ genre, count: counts[index] }))
    combined.sort((a, b) => b.count - a.count)

    return {
      genres: combined.map(item => item.genre),
      counts: combined.map(item => item.count)
    }
  }

  // Sort when switch is clicked
  const triggerSort = () => {
    if (sort) {setSort(false)}
    else {setSort(true)}
  }


  // Initialize chart
  useEffect(() => {
    if (data && chartRef.current) {
      const chart = echarts.init(chartRef.current)
      chart.on('click', function (params) {
        const genre = params.name
        setClickedGenre(genre)
      })

      const genreMap = new Map()

      data.forEach(game => {
        const genres = game.genres.map(genre => genre.name)
        genres.forEach(genre => {
          genreMap.set(genre, (genreMap.get(genre) || 0) + 1)
        })
      })

      // Data for chart
      let genres = Array.from(genreMap.keys())
      let counts = Array.from(genreMap.values())

      if (sort) {
        ({ genres, counts } = sortData(genres, counts))
      }

      // Chart options
      const options = {
        tooltip: {},
        xAxis: {
          type: 'category',
          data: genres
        },
        yAxis: {
          type: 'value' // Count of games
        },
        series: [{
          name: 'Number of games',
          type: 'bar',
          data: counts
        }]
      }
      chart.setOption(options)

      // Cleanup
      return () => {
        chart.dispose()
      }
    }
  }, [sort, data])

  return (
    <div className="view-graph">
      <SlideSwitch label={'Sort'} onChange={triggerSort} />
      <div ref={chartRef} style={{ width: '100%', height: '400px' }}></div>
      {clickedGenre && <ListGames genre={clickedGenre} year={year} />}
    </div>
  )
}

export default GenreChart