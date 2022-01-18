import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import {totalVaccinations } from '../../utils'
import InfoBox from '../../components/InfoBox/InfoBox'
import styles from './Vaccines.module.scss'

function Vaccines() {
    const [vaccinesPerCountry, setVaccinesPerCountry] = useState([])
    const [vaccines, setVaccines] = useState({})
    
    // get total vaccine data
    useEffect(() => {
        fetch('https://disease.sh/v3/covid-19/vaccine/coverage/countries?lastdays=1')
        .then(res => res.json())
        .then(response => {
            console.log(response)
            setVaccinesPerCountry(response.map(r => totalVaccinations(r.country, r.timeline)))
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
                    
            </div>
        </div>
    )
}

export default Vaccines
