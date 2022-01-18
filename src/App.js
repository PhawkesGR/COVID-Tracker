import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import styles from './App.module.scss';
import Header from './components/Header/Header';
import Vaccines from './views/Vaccines/Vaccines'
import Home from './views/Home/Home'
import Graphs from './views/Graphs/Graphs'

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
            <Route path="graphs" element={< Graphs selectedCountry={country}/>} />
            <Route path="vaccines" element={<Vaccines selectedCountry={country}/>} />
            <Route path="/*" element={<Home selectedCountry={country} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
