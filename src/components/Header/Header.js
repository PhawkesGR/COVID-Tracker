import React from 'react'
import { useState, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import styles from './Header.module.scss'

function Header({ onCountrySelect }) {
    const [countries, setCountryInput] = useState([])
    // get Data for all countries
    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/countries")
        .then(res => res.json())
        .then(response => {
            setCountryInput(response.map(r => r.country))
        })
    }, [])

    const handleChange = e => {
        const countryCode = e.target.value
        onCountrySelect(countryCode)
    }

    return (
        <div className={styles.Header}>
            <h1>COVID Tracker</h1>
            <Navbar />
            <select onChange={handleChange}>
                <option value='Worldwide'>Worldwide</option>
                {countries.map(c => {
                    return (
                        <option value={c} key={c}>{c}</option>
                    )
                })}
            </select>
            
        </div>
    )
}

export default Header
