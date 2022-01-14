import { useState, useEffect } from 'react'
import {totalVaccinations } from '../utils'

function Vaccinations() {
    const [vaccinesPerCountry, setVaccinesPerCountry] = useState([])
    
    // get total vaccine data
    useEffect(() => {
        fetch('https://disease.sh/v3/covid-19/vaccine/coverage/countries?lastdays=1')
        .then(res => res.json())
        .then(response => {
        console.log(response)
        setVaccinesPerCountry(response.map(r => totalVaccinations(r.country, r.timeline)))
        })
    }, [])
    return (
        <div>
            Vaccinations
        </div>
    )
}

export default Vaccinations
