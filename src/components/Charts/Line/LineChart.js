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

function LineChart({ metric, chartData, dimensions }) {
    const [data, setData] = useState({})

    const colors = {
      cases: {
        borderColor: '#5763e5',
        backgroundColor: 'rgba(87, 99, 229, 0.5)'
      },
      deaths: {
        borderColor: '#ff0000',
        backgroundColor: 'rgba(255, 0, 0, 0.5)'
      },
      recovered: {
        borderColor: '#49ef49',
        backgroundColor: 'rgba(73, 239, 73, 0.5)'
      },
    }

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
                    borderColor: colors[metric].borderColor,
                    backgroundColor: colors[metric].backgroundColor,
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