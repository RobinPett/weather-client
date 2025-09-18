import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

/**
 * Displays a LineChart component.
 *
 * @param {Array|Object} data - The data to be displayed in the chart.
 * @param {Array|Object} year - The year for which the data is displayed.
 * @returns {JSX.Element} - The LineChart component.
 */
const LineChart = ({ data }) => {
  console.log('LineChart data:', data)
  const chartRef = useRef(null)

  // Initialize chart
  useEffect(() => {
    if (data && chartRef.current) {
      const chart = echarts.init(chartRef.current)

      // Separate data by source
      const sensorData = data.filter(item => item.source === 'API')
      const smhiData = data.filter(item => item.source === 'SMHI')

      const smhiTimes = smhiData.map(item => {
        const date = new Date(item.createdAt)
        date.setMinutes(0, 0, 0)
        return date.getTime()
      })

      const uniqueTimes = Array.from(new Set(smhiTimes)).sort((a, b) => a - b)

      // Format time for xAxis
      const formattedTimes = uniqueTimes.map(timestamp =>
        new Date(timestamp).toLocaleDateString('sv-SE', { month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' })
      )

      // Map temperature to corresponding timestamps
      const sensorTempSeries = uniqueTimes.map(time => {
        const sensorValues = sensorData.filter(item => {
          const t = new Date(item.createdAt).getTime()
          return t >= time && t < time + 3600000 // within the hour
        }).map(item => item.temperature)

        if (sensorValues.length === 0) return null

        // Average
        const average = sensorValues.reduce((a, b) => a + b, 0) / sensorValues.length
        return Math.round(average * 10) / 10 // round to 1 decimal
      })

      const humiditySeries = uniqueTimes.map(time => {
        const sensorValues = sensorData.filter(item => {
          const t = new Date(item.createdAt).getTime()
          return t >= time && t < time + 3600000 // within the hour
        }).map(item => item.humidity)

        if (sensorValues.length === 0) return null

        // Average
        const average = sensorValues.reduce((a, b) => a + b, 0) / sensorValues.length
        return Math.round(average * 10) / 10 // round to 1 decimal
      })

      // SMHI temperature each hour
      const smhiTempSeries = uniqueTimes.map(time => {
        const found = smhiData.find(item => {
          const t = new Date(item.createdAt)
          t.setMinutes(0, 0, 0)
          return t.getTime() === time
        })
        return found ? found.smhiTemperature : null
      })

      // Chart options
      const options = {
        title: {
          text: 'Visby Temperature and Humidity',
          left: 'left'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['Indoor Temperature', 'Indoor Humidity', 'Outside Temperature'],
        },
        xAxis: {
          type: 'category',
          data: formattedTimes
        },
        yAxis: [
          {
            type: 'value',
            name: 'Temperature (°C)',
            position: 'left',
            axisLabel: {
              formatter: '{value} °C'
            }
          },
          {
            type: 'value',
            name: 'Humidity (%)',
            position: 'right',
            axisLabel: {
              formatter: '{value} %'
            }
          }
        ],
        series: [
          {
            name: 'Indoor Temperature',
            type: 'line',
            data: sensorTempSeries,
            smooth: true,
            lineStyle: {
              width: 2
            },
            yAxisIndex: 0 // Use the first yAxis for temperature
          },
          {
            name: 'Indoor Humidity',
            type: 'line',
            data: humiditySeries,
            smooth: true,
            lineStyle: {
              width: 2
            },
            yAxisIndex: 1 // Use the second yAxis for humidity
          },
          {
            name: 'Outside Temperature',
            type: 'line',
            data: smhiTempSeries,
            smooth: true,
            lineStyle: {
              width: 2
            },
            yAxisIndex: 0 // Use the first yAxis for SMHI temperature
          }
        ]
      }
      chart.setOption(options)

      // Cleanup
      return () => {
        chart.dispose()
      }
    }
  }, [data])

  return (
    <div className="view-graph">
      <div ref={chartRef} style={{ width: '100%', height: '400px' }}></div>
    </div>
  )
}

export default LineChart