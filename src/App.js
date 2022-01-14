import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import styles from './App.module.scss';
import Header from './components/Header/Header';
import Vaccinations from './routes/Vaccinations'
import Home from './components/Home/Home'
import Graphs from './routes/Graphs'

function App() {
  const [country, setCountryInput] = useState([])
  // const onCountryChange = async (e) => {
  //   const countryCode = e.target.value
    
  //   const fetchURL = countryCode === 'Worldwide' ?
  //       'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`

  //   await fetch(fetchURL)
  //   .then(res => res.json())
  //   .then(response => {
  //   console.log(response)
  //   setCountryInfo(response)
  //   if (countryCode === 'Worldwide') {
  //       setCoordinates({lat: 34.80746, long: -40.4796})
  //       setMapZoom(3)
  //   } else {
  //       setCoordinates({lat: response.countryInfo.lat, long: response.countryInfo.long})
  //       setMapZoom(5)
  //   }
  //   })
  // }
  return (
    <div className={styles.App}>
      <BrowserRouter>
        {/* <Header onCountryChange={onCountryChange} countries={country.map(c => c.country)} /> */}
        <Header />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="graphs" element={< Graphs/>} />
            <Route path="vaccinations" element={<Vaccinations />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
