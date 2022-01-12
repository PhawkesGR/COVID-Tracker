import { useEffect, useState } from 'react';
import styles from './App.module.scss';
import InfoBox from './components/InfoBox/InfoBox';
import Header from './components/Header/Header';
import RightSidebar from './components/RightSideBar/RightSidebar';
import Map from './components/Map/Map'
import { totalVaccinations } from './utils.js'

function App() {

  const [countryInfo, setCountryInfo] = useState({})
  // const [countries, setCountries] = useState([])
  const [country, setCountryInput] = useState([])
  const [vaccinesPerCountry, setVaccinesPerCountry] = useState([])
  const [mapZoom, setMapZoom] = useState(3)
  const [coordinates, setCoordinates] = useState({lat: 34.80746, long: -40.4796})
  const [circles, setCircles] = useState([])
  const [selectedMetric, setSelectedMetric] = useState('cases')

  // get Worldwide Data
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(res => res.json())
    .then(response => {
      console.log(response)
      setCountryInfo(response)
    })
  }, []);

  // get Data for all countries
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/countries")
    .then(res => res.json())
    .then(response => {
      console.log(response)
      setCountryInput(response)
      setCircles(response.map(c => {
        return {
          lat: c.countryInfo.lat,
          long: c.countryInfo.long,
          cases: c.todayCases,
          recovered: c.todayRecovered,
          deaths: c.todayDeaths,
          country: c.country,
          flag: c.countryInfo.flag
        }
      }))
    })
  }, [])

  // get total vaccine data
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
      console.log(response)
      setCountryInfo(response)
      if (countryCode === 'Worldwide') {
        setCoordinates({lat: 34.80746, long: -40.4796})
        setMapZoom(3)
      } else {
        setCoordinates({lat: response.countryInfo.lat, long: response.countryInfo.long})
        setMapZoom(5)
      }
    })
  }

  return (
    <div className={styles.App}>
      <div className={styles.MainContent}>
        <Header onCountryChange={onCountryChange} countries={country.map(c => c.country)} />
        <div className={styles.InfoBoxRow}>
          <InfoBox
            onClick={() => setSelectedMetric('cases')}
            active={selectedMetric === 'cases'}
            title='COVID Cases'
            value={countryInfo.todayCases}
            subValue={countryInfo.cases}
            metric='cases'
          />
          <InfoBox
            onClick={() => setSelectedMetric('recovered')}
            active={selectedMetric === 'recovered'}
            title='Recovered'
            value={countryInfo.todayRecovered}
            subValue={countryInfo.recovered}
            metric='recovered'
          />
          <InfoBox
            onClick={() => setSelectedMetric('deaths')}
            active={selectedMetric === 'deaths'}
            title='Deaths'
            value={countryInfo.todayDeaths}
            subValue={countryInfo.deaths}
            metric='deaths'
          />
        </div>
        <div className={styles.Map}>
          <Map zoom={mapZoom} lat={coordinates.lat} long={coordinates.long} circles={circles} metric={selectedMetric}/>
        </div>
      </div>
      <div className={styles.RightSideBar}>
        <RightSidebar metric={selectedMetric} vaccinations={vaccinesPerCountry} countries={country.map(c => ({
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
