import { useEffect, useState, useRef } from 'react'
import * as echarts from 'echarts'

/**
 * Displays a LineChart component.
 *
 * @param {Array|Object} data - The data to be displayed in the chart.
 * @param {Array|Object} year - The year for which the data is displayed.
 * @returns {JSX.Element} - The LineChart component.
 */
const LineChart = ({ data }) => {
  const chartRef = useRef(null)

  // Initialize chart
  useEffect(() => {
    if (data && chartRef.current) {
      const chart = echarts.init(chartRef.current)


      // Chart options
      const options = {
        title: {
          text: 'Temperature and Humidity Over Time',
          left: 'left'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['Temperature', 'Humidity'],
        },
        xAxis: {
          type: 'category',
          data: data.map(item => new Date(item.createdAt).toLocaleDateString('sv-SE', { month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' })), // Assuming data has a date field
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
            name: 'Temperature',
            type: 'line',
            data: data.map(item => item.temperature), // Assuming data has a temperature field
            smooth: true,
            lineStyle: {
              width: 2
            },
            yAxisIndex: 0 // Use the first yAxis for temperature
          },
          {
            name: 'Humidity',
            type: 'line',
            data: data.map(item => item.humidity), // Assuming data has a humidity field
            smooth: true,
            lineStyle: {
              width: 2
            },
            yAxisIndex: 1 // Use the second yAxis for humidity
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