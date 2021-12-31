import { useEffect, useState } from 'react';
import './App.scss';
import './components/InfoBox/InfoBox'
import InfoBox from './components/InfoBox/InfoBox';
import Header from './components/Header/Header';

function App() {

  const [countryInfo, setCountryInfo] = useState({})
  // const [countries, setCountries] = useState([])
  const [country, setCountryInput] = useState([])

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
    <div className="App">
      <Header onCountryChange={onCountryChange} countries={country.map(c => c.country)} />
      <div className='InfoBoxRow'>
        <InfoBox title='COVID Cases' value={countryInfo.todayCases} subValue={countryInfo.cases}/>
        <InfoBox title='Recovered' value={countryInfo.todayRecovered} subValue={countryInfo.recovered}/>
        <InfoBox title='Deaths' value={countryInfo.todayDeaths} subValue={countryInfo.deaths}/>
      </div>
    </div>
  );
}

export default App;
