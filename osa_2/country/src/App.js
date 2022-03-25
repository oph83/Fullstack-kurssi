import { useState, useEffect } from 'react';
import axios from 'axios';
import Country from './components/country'
import CountryList from './components/countryList';

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState("")
  const [weather, setWeather] = useState([])
  const [capital, setCapital] = useState("Helsinki")
  
  const getCountries = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  } 

  useEffect(getCountries, [])

  const getWeather = () => {
    const api_key = process.env.REACT_APP_API_KEY
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`)
      .then(response => {
        setWeather(response.data)
      })
  } 
  useEffect(getWeather, [capital])
  
  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setSearchCountry(event.target.value)
  }

  const searchFilter = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchCountry.toLowerCase()))
  
  const filteredCountries = 
    searchCountry === ' ' ? [ ] 
  : searchFilter.length > 10 ? <p>Too many searches, specify another filter</p> 
  : searchFilter.map((country) => searchFilter.length <= 10 && searchFilter.length > 1 
  ? <CountryList key={country.name.common} country={country} setSearchCountry={()=>setSearchCountry(country.name.common)}/>
  : <Country key={country.name.common} country={country} weather={weather} setCapital={setCapital}/>)

  return (
    <div>
      find countries <input
      type="search"
      value={searchCountry}
      onChange={handleSearchChange}
      />
      {filteredCountries}
    </div>
  )
}

export default App