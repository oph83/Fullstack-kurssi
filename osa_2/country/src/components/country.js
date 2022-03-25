import React from 'react'

const Country = ( {country, weather, setCapital} ) => {
    const languages = country.languages;
    const language = [];
    for (const lang in languages) {
      language.push(<li key={language.length + 1}>{languages[lang]}</li>);
    }
    
    setCapital(country.capital)

    return (
        <div>
          <h2>{country.name.common}</h2>
          <p>Capital: {country.capital}</p>
          <p>Area: {country.area}</p>
          <h4>Languages</h4>
          <ul>{language}</ul>
          <img src={country.flags.png} alt=''/>
          <h3>Weather in {country.capital}</h3>
          <p>temperature {((weather.main.temp) - 273.15).toFixed(2)} Celcius</p>
          <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon"/>
          <p>wind {weather.wind.speed} m/s</p>
        </div>
    )
}

export default Country