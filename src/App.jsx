import { useEffect, useState } from 'react';
import { convertToFlag } from './starter';
import Weather from './Weather';

function App() {
  const [location, setLocation] = useState(
    localStorage.getItem('location') || ''
  );
  const [displayLocation, setDisplayLoaction] = useState('');
  const [weather, setWeather] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  function handleInput(e) {
    setLocation(e.target.value);
  }

  async function handleSearch(location) {
    if (location.length < 2) return;
    try {
      setIsLoading((isLoading) => !isLoading);
      // 1) Getting location (geocoding)
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${location}`
      );
      const geoData = await geoRes.json();
      console.log(geoData);

      if (!geoData.results) throw new Error('Location not found');

      const { latitude, longitude, timezone, name, country_code } =
        geoData.results.at(0);
      setDisplayLoaction(`${name} ${convertToFlag(country_code)}`);

      // 2) Getting actual weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );
      const weatherData = await weatherRes.json();
      setWeather(weatherData.daily);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading((isLoading) => !isLoading);
    }
  }

  useEffect(
    function () {
      handleSearch(location);

      localStorage.setItem('location', location);
    },
    [location]
  );

  return (
    <div className='app'>
      <h1>Classy Weather</h1>
      <div>
        <input
          type='text'
          placeholder='Search from location...'
          value={location}
          onChange={handleInput}
        />
      </div>

      {isLoading && <p className='loader'>Loading...</p>}

      {!isLoading && weather.weathercode && (
        <Weather weather={weather} location={displayLocation} />
      )}
    </div>
  );
}

export default App;
