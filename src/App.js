import { useEffect, useState } from 'react';
import './App.scss';
import './components/InfoBox/InfoBox'
import InfoBox from './components/InfoBox/InfoBox';
import Header from './components/Header/Header';

function App() {

  const [countryInfo, setCountryInfo] = useState({})
  const [countries, setCountries] = useState([])

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
      setCountries(response)
    })
  }, [])

  return (
    <div className="App">
      <Header countries={countries.map(c => c.country)} />
      <div className='InfoBoxRow'>
        <InfoBox title='COVID Cases' value={countryInfo.todayCases} subValue={countryInfo.cases}/>
        <InfoBox title='Recovered' value={countryInfo.todayRecovered} subValue={countryInfo.recovered}/>
        <InfoBox title='Deaths' value={countryInfo.todayDeaths} subValue={countryInfo.deaths}/>
      </div>
    </div>
  );
}

export default App;
