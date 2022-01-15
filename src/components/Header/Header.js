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

    // const onCountryChange = async (e) => {
    //     const countryCode = e.target.value
        
    //     const fetchURL = countryCode === 'Worldwide' ?
    //         'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    //     await fetch(fetchURL)
    //     .then(res => res.json())
    //     .then(response => {
    //     console.log(response)
    //     setCountryInfo(response)
    //     if (countryCode === 'Worldwide') {
    //         setCoordinates({lat: 34.80746, long: -40.4796})
    //         setMapZoom(3)
    //     } else {
    //         setCoordinates({lat: response.countryInfo.lat, long: response.countryInfo.long})
    //         setMapZoom(5)
    //     }
    //     })
    // }
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
