import { useEffect, useState } from 'react';
import styles from './App.module.scss';
import InfoBox from './components/InfoBox/InfoBox';
import Header from './components/Header/Header';
import RightSidebar from './components/RightSideBar/RightSidebar';
import { totalVaccinations } from './utils.js'

function App() {

  const [countryInfo, setCountryInfo] = useState({})
  // const [countries, setCountries] = useState([])
  const [country, setCountryInput] = useState([])
  const [vaccinesPerCountry, setVaccinesPerCountry] = useState([])

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(res => res.json())
    .then(response => {
      console.log(response)
      setCountryInfo(response)
    })
  }, []);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/countries")
    .then(res => res.json())
    .then(response => {
      console.log(response)
      setCountryInput(response)
    })
  }, [])

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/vaccine/coverage/countries?lastdays=1')
    .then(res => res.json())
    .then(response => {
      console.log(response)
      setVaccinesPerCountry(response.map(r => totalVaccinations(r.country, r.timeline)))
    })
  }, [])

  const onCountryChange = async (e) => {
    const countryCode = e.target.value
    
    const fetchURL = countryCode === 'Worldwide' ?
      'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(fetchURL)
    .then(res => res.json())
    .then(response => {
      setCountryInfo(response)
    })
  }

  return (
    <div className={styles.App}>
      <div className={styles.MainContent}>
        <Header onCountryChange={onCountryChange} countries={country.map(c => c.country)} />
        <div className={styles.InfoBoxRow}>
          <InfoBox title='COVID Cases' value={countryInfo.todayCases} subValue={countryInfo.cases}/>
          <InfoBox title='Recovered' value={countryInfo.todayRecovered} subValue={countryInfo.recovered}/>
          <InfoBox title='Deaths' value={countryInfo.todayDeaths} subValue={countryInfo.deaths}/>
        </div>
      </div>
      <div className={styles.RightSideBar}>
        <RightSidebar vaccinations={vaccinesPerCountry} countries={country.map(c => ({
          name: c.country,
          active: c.active,
          deaths: c.deaths,
          cases: c.cases,
          recovered: c.recovered}
        ))}/>
      </div>
    </div>
  );
}

export default App;
