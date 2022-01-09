import React from 'react'
import styles from './Header.module.scss'

function Header({ countries, onCountryChange }) {
    return (
        <div className={styles.Header}>
            <h1>COVID Tracker</h1>
            <select onChange={onCountryChange}>
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