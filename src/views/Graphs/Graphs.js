import styles from './Graphs.module.scss'
import { useState, useEffect } from 'react'
import { buildDoughnutData, filterOptions } from './helpers'
import LineChart from '../../components/Charts/Line/LineChart'
import DoughnutChart from '../../components/Charts/Doughnut/DoughnutChart'
import Selector from '../../components/Selector/Selector'

function Graphs({ selectedCountry }) {
    const [timeframe, setTimeframe] = useState('all')
    const [cases, setCases] = useState({})
    const [recovered, setRecovered] = useState({})
    const [deaths, setDeaths] = useState({})
    const [vaccinations, setVaccinations] = useState({})
    const [chartOptions, setChartOptions] = useState({})
    const [chartData, setChartData] = useState({})

    // get cases, deaths, recovered
    useEffect(() => {
        const country = selectedCountry === 'Worldwide' ? 'all' : selectedCountry
        fetch(`https://disease.sh/v3/covid-19/historical/${country}?lastdays=${timeframe}`)
        .then(res => res.json())
        .then(response => {
            let result = {}
            if (response.message) return
            if (response.country) {
                Object.assign(result, response.timeline)
            } else {
                Object.assign(result, response)
            }
            setCases({
                cases: result.cases
            })
            setRecovered({
                recovered: result.recovered
            })
            setDeaths({
                deaths: result.deaths
            })
        })
    }, [selectedCountry, timeframe])

    // get vaccinations
    useEffect(() => {
        const url = selectedCountry === 'Worldwide' ?
            `https://disease.sh/v3/covid-19/vaccine/coverage?lastdays=${timeframe}` :
            `https://disease.sh/v3/covid-19/vaccine/coverage/countries/${selectedCountry}?lastdays=${timeframe}`
        fetch(url)
        .then(res => res.json())
        .then(response => {
            let result = {}
            if (response.message) return
            if (response.country) {
                Object.assign(result, response.timeline)
            } else {
                Object.assign(result, response)
            }
            setVaccinations({
                vaccinations: result
            })
        })
    }, [selectedCountry, timeframe])

    useEffect(() => {
        const scales = {
            '30': {
                x: {
                  type: 'time',
                  time: {
                      unit: 'day',
                      stepSize: 1
                  }
                },
                y: {
                  ticks: {
                    stepSize: 10000
                  }
                }
            },
            '182': {
                x: {
                    type: 'time',
                    time: {
                        unit: 'month',
                        stepSize: 1
                    }
                  },
                  y: {
                    ticks: {
                      stepSize: 10000
                    }
                  }
            },
            '365': {
                x: {
                    type: 'time',
                    time: {
                        unit: 'month',
                        stepSize: 1
                    }
                  },
                  y: {
                    ticks: {
                      stepSize: 10000
                    }
                  }
            },
            'all': {
                x: {
                    type: 'time',
                    time: {
                        unit: 'month',
                        stepSize: 3
                    }
                  },
                  y: {
                    ticks: {
                      stepSize: 10000
                    }
                  }
            }
        }
        setChartOptions({
            scales: scales[timeframe]
        })
    }, [timeframe])

    // get data per continent
    useEffect(() => {
        fetch('https://disease.sh/v3/covid-19/continents')
        .then(res => res.json())
        .then(response => {
            setChartData({
                cases: buildDoughnutData(response, 'cases'),
                deaths: buildDoughnutData(response, 'deaths'),
                recovered: buildDoughnutData(response, 'recovered'),
                labels: response.map(r => r.continent)
            })
        })
    }, [])

    const filterChanged = filter => {
        setTimeframe(filter.value)
    }

    return (
        <div className={styles.container}>
            <div className={styles.filtersContainer}>
                <Selector onClick={filterChanged} options={filterOptions}/>
            </div>
            <div className={styles.graphsContainer}>
                {/* Cases Chart */}
                <div className={styles.cases}> 
                    <div className={styles.card}>
                        <h1 className={styles.title}>Cases</h1>
                        {
                            Object.keys(cases).length > 0 ?
                                <LineChart 
                                    chartData={cases}
                                    options={chartOptions}
                                    dimensions={{width: '335px', height: '250px'}}
                                    metric='cases'
                                />
                            : 'No data available'
                        }
                    </div>
                </div>

                {/* Cases per Continent Chart */}
                {
                    timeframe === 'all' &&
                    <div className={styles.continents}>
                        <div className={styles.card}>
                            <h1 className={styles.title}>Cases per Continent</h1>
                            <DoughnutChart
                                dimensions={{width: '250px', height: '335px'}}
                                chartData={{labels: chartData.labels, datasets: chartData.cases}}
                            />
                        </div>
                    </div>
                }

                {/* Recovered Chart */}
                <div className={styles.recovered}>
                    <div className={styles.card}>
                        <h1 className={styles.title}>Recovered</h1>
                        {
                            Object.keys(recovered).length > 0 ?
                                <LineChart 
                                    chartData={recovered}
                                    options={chartOptions}
                                    dimensions={{width: '335px', height: '250px'}}
                                    metric='recovered'
                                />
                            : 'No data available'
                        }
                    </div>
                </div>

                {/* Recovered per Continent Chart */}
                {
                    timeframe === 'all' &&
                    <div className={styles.continents}>
                        <div className={styles.card}>
                            <h1 className={styles.title}>Recovered per Continent</h1>
                            <DoughnutChart
                                dimensions={{width: '250px', height: '335px'}}
                                chartData={{labels: chartData.labels, datasets: chartData.recovered}}
                            />
                        </div>
                    </div>
                }

                {/* Deaths Chart */}
                <div className={styles.deaths}>
                    <div className={styles.card}>
                        <h1 className={styles.title}>Deaths</h1>
                        {
                            Object.keys(deaths).length > 0 ?
                                <LineChart 
                                    chartData={deaths}
                                    options={chartOptions}
                                    dimensions={{width: '335px', height: '250px'}}
                                    metric='deaths'
                                />
                            : 'No data available'
                        }
                    </div>
                </div>

                {/* Deaths per Continent Chart */}
                {
                    timeframe === 'all' &&
                    <div className={styles.continents}>
                        <div className={styles.card}>
                            <h1 className={styles.title}>Deaths per Continent</h1>
                            <DoughnutChart
                                dimensions={{width: '250px', height: '335px'}}
                                chartData={{labels: chartData.labels, datasets: chartData.deaths}}
                            />
                        </div>
                    </div>
                }

                {/* Vaccinations Chart */}
                <div className={styles.vaccinations}>
                    <div className={styles.card}>
                        <h1 className={styles.title}>Vaccinations</h1>
                        {
                            Object.keys(vaccinations).length > 0 ?
                                <LineChart 
                                    chartData={vaccinations}
                                    options={chartOptions}
                                    dimensions={{width: '335px', height: '250px'}}
                                    metric='vaccinations'
                                />
                            : 'No data available'
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Graphs
