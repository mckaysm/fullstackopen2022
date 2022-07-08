import logo from './logo.svg';
import './App.css';

import { useEffect, useState } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const WeatherView = ({city}) => {
  const [currentWeather, setCurrentWeather] = useState('')
  const fetchWeather = () => {
    axios.get(`http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}&aqi=no`)
    .then(response => {
      console.log('Weather data', response.data)
      setCurrentWeather(response.data)
    })  
  }
  useEffect(fetchWeather, [])

  return (
    <div>
      {currentWeather && 
        <>
        <h2>Weather in {currentWeather.location.name}</h2>
        <p>temperature {currentWeather.current.temp_c} Celsius</p>
        <img src={currentWeather.current.condition.icon}></img>
        <p>wind {currentWeather.current.wind_kph} {currentWeather.current.wind_dir}</p>
        </>}
    </div>
  )
}

const CountryView = ({country}) => {
  let languages = Object.values(country.languages)
  console.log(country, country.languages)
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <ul>
        {languages.map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.png}></img>
      <WeatherView city={country.capital[0]}/>
    </div>
  )
}

const CountryListItem = ({country, handleSelectCountry}) => {
  return (
    <li>
      {country.name.common} <button onClick={handleSelectCountry(country)}>show</button>
    </li>
  )
}

const CountryList = ({countries, selectedCountry, setSelectedCountry}) => {
  
  console.log({countries}, {selectedCountry})
  const handleSelectCountry = (country) => () => setSelectedCountry(country)

  if (selectedCountry) {
    return (<CountryView country={selectedCountry}/>)
  }

  if (countries.length == 1) {
    return (<CountryView country={countries[0]}/>)
  } else if (countries.length <= 10) {
    return (
      <ul>
        {countries.map(country => 
          <CountryListItem key={country.cca2} country={country} handleSelectCountry={handleSelectCountry}/>)}
      </ul>
      )
  } else {
    return (
      <div>Too many matches</div>
    )
  }
}

const CountryFilter = ({countryFilter, updateCountryFilter}) => {
  return (
    <input value={countryFilter} onChange={updateCountryFilter}/>
  )
}

const App = () => {
  const [countryFilter, setCountryFilter] = useState('')
  const [countryList, setCountryList] = useState([])
  const [selectedCountry, setSelectedCountry] = useState('')
  

  const updateCountryFilter = (event) => {
    setSelectedCountry('') //Go back to the list view
    setCountryFilter(event.target.value)
  }

  const fetchAllCountries = () =>
  {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log(response.data)
        setCountryList(response.data)
    })
  }

  useEffect(fetchAllCountries, [])

  const filteredCountries = countryList.filter(c => c.name.common.toLowerCase().includes(countryFilter.toLowerCase()))

  return (
    <div>
      Find countries <CountryFilter countryFilter={countryFilter} updateCountryFilter={updateCountryFilter}/>
      <CountryList countries={filteredCountries} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry}/>
    </div>
  );
}

export default App;
