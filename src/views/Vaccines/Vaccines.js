import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import { sort, decodeHtml } from '../../utils'
import InfoBox from '../../components/InfoBox/InfoBox'
import Table from '../../components/Table/Table'
import styles from './Vaccines.module.scss'
import LineChart from '../../components/Charts/Line/LineChart'

function Vaccines() {
    const [vaccines, setVaccines] = useState({})
    const [tableData, setTableData] = useState({})
    const [chartData, setChartData] = useState({})
    const [activeVaccineInfo, setActiveVaccineInfo] = useState(-1)
    
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

    const openMoreInfo = (index) => {
        if (index === activeVaccineInfo) return setActiveVaccineInfo(-1)
        return setActiveVaccineInfo(index)
    }

    const setPhaseStyles = phase => {
        let style
        switch (phase) {
            case 'Pre-clinical':
                style = styles.preclinical
                break;
            case 'Phase 1':
                style = styles.phase1
                break;
            case 'Phase 1/2':
                style = styles.phase12
                break;
            case 'Phase 2':
                style = styles.phase2
                break;
            case 'Phase 2/3':
                style = styles.phase23
                break;
            case 'Phase 3':
                style = styles.phase3
                break;
            default:
                break;
        }
        return style
    }
    
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
                        <div className={styles.vaccinesList}>
                            {vaccines.data.map((v, index) => (
                                <div key={nanoid()} className={styles.container}>
                                    <div className={`${styles.mainInfo}`}>
                                        <div className={styles.text} onClick={() => openMoreInfo(index)}>
                                            <div className={styles.candidate}>
                                                {v.candidate.split('(')[0]}
                                            </div>
                                            <div className={styles.sponsor}>
                                                {v.sponsors.map(s => s)[0]}
                                            </div>
                                            <div className={styles.mechanism}>
                                                {v.mechanism.split('(')[0]}
                                            </div>
                                            <div className={`${styles.phase} ${setPhaseStyles(v.trialPhase)}`}>
                                                {v.trialPhase}
                                            </div>
                                        </div>
                                        <div onClick={() => openMoreInfo(index)} className={`${styles.button} ${`material-icons`}`}>
                                            {activeVaccineInfo !== index ? 'add' : 'remove'}
                                        </div>
                                    </div>
                                    <div className={activeVaccineInfo !== index ? styles.moreInfo : `${styles.moreInfo} ${styles.revealInfo}`}>
                                        <p>
                                            {decodeHtml(v.details)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
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
