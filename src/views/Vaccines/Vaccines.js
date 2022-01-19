import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import { sort } from '../../utils'
import InfoBox from '../../components/InfoBox/InfoBox'
import Table from '../../components/Table/Table'
import styles from './Vaccines.module.scss'
import LineChart from '../../components/Charts/Line/LineChart'

function Vaccines() {
    const [vaccines, setVaccines] = useState({})
    const [tableData, setTableData] = useState({})
    const [chartData, setChartData] = useState({})
    
    // get total vaccinations per country
    useEffect(() => {
        fetch('https://disease.sh/v3/covid-19/vaccine/coverage/countries?lastdays=1')
        .then(res => res.json())
        .then(response => {
            const data = {
                tables: {
                    totalVaccinations: {
                        title: 'Total Vaccinations per Country',
                        index: 0,
                        data: sort(response.map(c => {
                            return {
                                key: c.country,
                                value: Object.values(c.timeline)[0]
                            }
                        }))
                    }
                },
                defaultTable: 'totalVaccinations'
            }
            setTableData(data)
        })
    }, [])

    // get vaccine data
    useEffect(() => {
        fetch('https://disease.sh/v3/covid-19/vaccine')
        .then(res => res.json())
        .then(response => {
            console.log(response)
            setVaccines(response)
        })
    }, [])

    useEffect(() => {
        fetch('https://disease.sh/v3/covid-19/vaccine/coverage?lastdays=365')
        .then(res => res.json())
        .then(response => {
            setChartData({
                vaccinations: response
            })
        })
    }, [])
    
    return (
        <div className={styles.Vaccines}>
            <div className={styles.MainContent}>
                <div className={styles.InfoBoxRow}>
                    {
                        Object.keys(vaccines).length > 0 ?
                            vaccines.phases.map(p => {
                                return (
                                    <InfoBox 
                                        title={p.phase}
                                        value={p.candidates}
                                        key={nanoid()}
                                    />
                                )
                            })
                            : ''
                    }
                </div>
                <div className={styles.VaccinesInfo}>
                    {
                        Object.keys(vaccines).length > 0 ?
                        <table>
                            <tbody>
                                <tr>
                                    <th>Candidate</th>
                                    <th>Phase</th>
                                    <th>Mechanism</th>
                                    <th>Sponsors</th>
                                </tr>
                                {vaccines.data.map(v => (
                                    <tr key={nanoid()}>
                                        <td>{v.candidate}</td>
                                        <td>{v.trialPhase}</td>
                                        <td>{v.mechanism}</td>
                                        <td>{v.sponsors.map(s => s)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        : ''
                    }
                </div>
            </div>
            <div className={styles.RightSidebar}>
                <Table data={tableData}/>
                <div className={styles.title}>Worldwide Vaccinations</div>
                <LineChart 
                    chartData={chartData}
                    dimensions={{width: '335px', height: '250px'}}
                    metric='vaccinations'
                />
            </div>
        </div>
    )
}

export default Vaccines
