import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    TimeScale,
    Title,
    Tooltip,
    Legend,
    Filler
  } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import 'chartjs-adapter-moment'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    TimeScale,
    Filler,
    Title,
    Tooltip,
    Legend
)

function LineChart({ title, labels, metric, chartData, dimensions }) {
    const [data, setData] = useState({})

    useEffect(() => {
        if (Object.keys(chartData).length > 0) {
            const keys = Object.keys(chartData[metric])
            const values = Object.values(chartData[metric])
            setData({
                labels: keys,
                datasets: [{
                    lineTension: 0,
                    fill: true,
                    label: metric,
                    borderColor: 'rgb(255, 0, 0)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    data: values
                }]
            })
        }
    }, [chartData, metric])

    const options = {
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem, data) {
                return Intl.NumberFormat('en').format(tooltipItem.parsed.y)
              }
            }
          },
        },
        elements: {
          point: {
            radius: 0,
          },
        },
        scales: {
            x: {
              type: 'time',
              time: {
                  unit: 'month',
                  stepSize: 1
              }
            },
            y: {
              suggestedMax: 45,
              ticks: {
                stepSize: 5,
                //max: 100
              }
            },
        },
        responsive: true,
        title: {
            display: true,
            text: 'Covid Cases'
        }
    }

    return (
        <div>
            {
                Object.keys(data).length > 0 ?
                    <>
                        <Line
                            options={options}
                            data={data}
                            width={dimensions.width}
                            height={dimensions.height}
                        />
                    </> : ''
            }
        </div>
    )
}

export default LineChart
