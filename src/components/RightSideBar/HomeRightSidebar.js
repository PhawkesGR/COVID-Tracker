import { React, useState, useEffect } from 'react'
import { sort } from '../../utils.js'
import Table from '../Table/Table.js'
import styles from './HomeRightSidebar.module.scss'
import LineChart from '../Charts/Line/LineChart.js'

function HomeRightSideBar({ countries, metric }) {

    const chartTitle = {
        cases: 'Worldwide New Cases',
        deaths: 'Worldwide Deaths',
        recovered: 'Worldwide Recovered'
    }

    const [chartData, setChartData] = useState({})
    const [tableData, setTableData] = useState({})

    useEffect(() => {
        const data = {
            tables: {
                activeCases: {
                    title: 'Live Cases by Country',
                    index: 0,
                    data: sort(countries.map(c => {
                        return {
                            key: c.name,
                            value: c.active
                        }
                    }))
                },
                totalDeaths: {
                    title: 'Total Deaths by Country',
                    index: 1,
                    data: sort(countries.map(c => {
                        return {
                            key: c.name,
                            value: c.deaths
                        }
                    }))
                },
                totalRecovered: {
                    title: 'Total Recovered by Country',
                    index: 2,
                    data: sort(countries.map(c => {
                        return {
                            key: c.name,
                            value: c.recovered
                        }
                    }))
                },
                totalCases: {
                    title: 'Total Cases by Country',
                    index: 3,
                    data: sort(countries.map(c => {
                        return {
                            key: c.name,
                            value: c.cases
                        }
                    }))
                }
            },
            defaultTable: 'activeCases'
        }
        setTableData(data)
    }, [countries])

    useEffect(() => {
        fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=365')
        .then(res => res.json())
        .then(response => {
            setChartData(response)
        })
    }, [])


    return (
        <div className={styles.card}>
            <div className={styles.table}>
                <Table data={tableData}/>
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

export default HomeRightSideBar
