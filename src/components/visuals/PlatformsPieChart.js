import { useEffect, useRef} from 'react'
import * as echarts from 'echarts'

/**
 * Displays a specified sound.
 *
 * @param {Array|Object} data - The data to be displayed in the chart.
 * @returns {JSX.Element} - The PlatformsPieChart component.
 */
const PlatformsPieChart = ({ data }) => {
  const chartRef = useRef(null)
  const dataLength = data.length

  // Initialize chart
  useEffect(() => {
    const platformCounts = data.reduce((accumulator, platformsObject) => {
      // Check for multiple platforms
      if (Array.isArray(platformsObject.platforms)) {
        platformsObject.platforms.forEach(platform => {
          const platformName = platform.name
          accumulator[platformName] = (accumulator[platformName] || 0) + 1
          return accumulator
        })
        return accumulator
      } else {
        const platformName = platformsObject.platforms.name
        accumulator[platformName] = (accumulator[platformName] || 0) + 1
        return accumulator
      }
    })
    setChartOptions(platformCounts)
  }, [data])

  // Set chart options and initialize the chart
  const setChartOptions = (data) => {
    const chart = echarts.init(chartRef.current)
    const option = {
      title: { text: 'Distribution of Platforms' },
      series: [{
        type: 'pie',
        data: Object.entries(data).map(([platform, count]) => ({ name: platform, value: count })), 
      }],
      radius: '50%',
    }
    chart.setOption(option)
  }

  return (
    <div className="view-graph">
      <h1>Platform distribution chart</h1>
      <h2>Number of games: {dataLength}</h2>
      <div ref={chartRef} style={{ width: '100%', height: '400px' }}></div>
    </div>
  )
}

export default PlatformsPieChart