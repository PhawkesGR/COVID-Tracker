import { useEffect, useState } from 'react';
import styles from './Home.module.scss'
import RightSidebar from '../RightSideBar/RightSidebar';
import InfoBox from '../InfoBox/InfoBox';
import Map from '../Map/Map';

function Home({ selectedCountry }) {
    const [countryInfo, setCountryInfo] = useState({})
    const [country, setCountryInput] = useState([])
    const [mapZoom, setMapZoom] = useState(3)
    const [coordinates, setCoordinates] = useState({lat: 34.80746, long: -40.4796})
    const [circles, setCircles] = useState([])
    const [selectedMetric, setSelectedMetric] = useState('cases')

    // get Worldwide Data (default state)
    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/all")
        .then(res => res.json())
        .then(response => {
        console.log(response)
        setCountryInfo(response)
        })
    }, []);

    // get Data for all countries
    // used to create the initial Map
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

    // set new data every time a new country is selected
    useEffect(() => {
        const fetchURL = selectedCountry === 'Worldwide' ?
            'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${selectedCountry}`
        
        fetch(fetchURL)
        .then(res => res.json())
        .then(response => {
            setCountryInfo(response)
            if (selectedCountry === 'Worldwide') {
                setCoordinates({lat: 34.80746, long: -40.4796})
                setMapZoom(3)
            } else {
                setCoordinates({lat: response.countryInfo.lat, long: response.countryInfo.long})
                setMapZoom(5)
            }
        })
    }, [selectedCountry])

    return (
        <div className={styles.Home}>
            <div className={styles.MainContent}>
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
            <RightSidebar metric={selectedMetric} countries={country.map(c => ({
                name: c.country,
                active: c.active,
                deaths: c.deaths,
                cases: c.cases,
                recovered: c.recovered}
            ))}/>
            </div>
        </div>
    )
}

export default Home