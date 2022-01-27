import styles from './DoughnutChart.module.scss'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useState, useEffect } from 'react'

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart({ chartData, dimensions, options = {} }) {
  const [data, setData] = useState({})

  useEffect(() => {
    if (Object.values(chartData).filter(c => c !== undefined).length >= 2) {
      setData({
        labels: chartData.labels,
        datasets: [chartData.datasets]
      })
    }
  }, [chartData])

  const defaultOptions = {
    responsive: true,
    maintainAspectRatio : false
  }

  const finalOptions = Object.assign({}, defaultOptions, options)

  return (
    <div className={styles.doughnut}>
      {
        Object.keys(data).length > 0 ?
          <Doughnut
            options={finalOptions}
            data={data}
            height={dimensions.height}
            width={dimensions.width}
          />
        : ''
      }
    </div>
  )
}

export default DoughnutChart;
