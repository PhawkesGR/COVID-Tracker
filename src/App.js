import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import styles from './App.module.scss';
import Header from './components/Header/Header';
import Vaccinations from './routes/Vaccinations'
import Home from './components/Home/Home'
import Graphs from './routes/Graphs'

function App() {
  const [country, setSelectedCountry] = useState('Worldwide')

  const handleCountryChange = country => {
    setSelectedCountry(country)
  }

  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Header onCountrySelect={handleCountryChange}/>
        <Routes>
            <Route path="/" element={<Home selectedCountry={country} />} />
            <Route path="graphs" element={< Graphs/>} />
            <Route path="vaccinations" element={<Vaccinations />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
