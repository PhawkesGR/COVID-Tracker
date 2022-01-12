import { React, useState, useEffect } from 'react'
import { formatNumber, sort } from '../../utils.js'
import styles from './RightSidebar.module.scss'
import previous from '../../assets/left-arrow.png'
import next from '../../assets/right-arrow.png'
import LineChart from '../Charts/Line/LineChart.js'

function RightSidebar({ countries, vaccinations, metric }) {

    let statsArray = [
        {
            name: 'activeCases',
            title: 'Live Cases by Country',
            index: 0
        },
        {
            name: 'totalCases',
            title: 'Total Cases by Country',
            index: 1
        },
        {
            name: 'totalDeaths',
            title: 'Total Deaths by Country',
            index: 2
        },
        {
            name: 'totalRecovered',
            title: 'Total Recovered by Country',
            index: 3
        }
    ]

    const chartTitle = {
        cases: 'Worldwide New Cases',
        deaths: 'Worldwide Deaths',
        recovered: 'Worldwide Recovered'
    }

    const [stats, setStats] = useState(statsArray[0])
    const [activeCases, setActiveCases] = useState([])
    const [totalCases, setTotalCases] = useState([])
    const [totalDeaths, setTotalDeaths] = useState([])
    const [totalRecovered, setTotalRecovered] = useState([])
    const [currentTable, setCurrentTable] = useState([])
    const [chartData, setChartData] = useState({})

    useEffect(() => {
        const unsortedCases = countries.map(c => {
            return {
                name: c.name,
                value: c.active
            }
        })
        setActiveCases(sort(unsortedCases))
        setCurrentTable(activeCases)
    }, [countries])

    useEffect(() => {
        const unsortedCases = countries.map(c => {
            return {
                name: c.name,
                value: c.cases
            }
        })
        setTotalCases(sort(unsortedCases))
    }, [countries])

    useEffect(() => {
        const unsortedCases = countries.map(c => {
            return {
                name: c.name,
                value: c.deaths
            }
        })
        setTotalDeaths(sort(unsortedCases))
    }, [countries])

    useEffect(() => {
        const unsortedCases = countries.map(c => {
            return {
                name: c.name,
                value: c.recovered
            }
        })
        setTotalRecovered(sort(unsortedCases))
    }, [countries])

    // when stats update in changeStatistics, set the new currentTable
    useEffect(() => {
        stats.name === 'totalDeaths' ? setCurrentTable(totalDeaths)
        : stats.name === 'totalCases' ? setCurrentTable(totalCases)
        : stats.name === 'activeCases' ? setCurrentTable(activeCases)
        : setCurrentTable(totalRecovered)
    }, [stats])

    useEffect(() => {
        fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=365')
        .then(res => res.json())
        .then(response => {
            console.log(response)
            setChartData(response)
        })
    }, [])

    const changeStatistics = (action) => {
        if (action === 'next') {
            // get back to the first stat, if the current is the last one
            if (stats.index === statsArray.length - 1) return setStats(statsArray[0])
            setStats(statsArray[stats.index + 1])
        } else {
            // go to the last stat, if the current is the first one
            if (stats.index === 0) return setStats(statsArray[statsArray.length - 1])
            setStats(statsArray[stats.index - 1])
        }
    }

    return (
        <div className={styles.card}>
            <div className={styles.table}>
                <div className={styles.title}>
                    <img onClick={() => changeStatistics('previous')} src={previous} alt='previous'></img>
                    <h1>{stats.title}</h1>
                    <img onClick={() => changeStatistics('next')} src={next} alt='next'></img>
                </div>
                <div className={styles.countryRow}>
                    <table>
                        <tbody>
                            {currentTable.map((country) => (
                                <tr key={country.name}>
                                    <td>{country.name}</td>
                                    <td>
                                        <strong>{formatNumber(country.value)}</strong>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className={styles.graph}>
                <div className={styles.title}>{chartTitle[metric]}</div>
                <LineChart
                    chartData={chartData}
                    dimensions={{width: '335px', height: '250px'}}
                    metric={metric}
                />
            </div>
        </div>
    )
}

export default RightSidebar
