import { useState, useEffect } from "react";
import countrieService from "./services/countries";
import "./App.css";
import Search from "./components/Search";
import CountryDetail from "./components/CountryDetail";
import Countries from "./components/Countries";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [showedCountries, setShowedCountries] = useState([]);
  const [weather, setWeather] = useState(null);
  const [weatherCountry, setWeatherCountry] = useState(null); // To avoid re-fetching the weather

  useEffect(() => {
    countrieService.getAllCountries().then((response) => {
      setCountries(response);
    });
  }, []);

  useEffect(() => {
    if (!search) {
      setShowedCountries([]);
      setWeather(null);
      setWeatherCountry(null);
      return;
    }
    const filteredCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
    );
    setShowedCountries(filteredCountries);

    if (filteredCountries.length === 1) {
      const country = filteredCountries[0];
      if (weatherCountry !== country.name.common) {
        countrieService
          .getWeather(country.latlng[0], country.latlng[1])
          .then((weather) => {
            setWeather(weather);
            setWeatherCountry(country.name.common);
          });
      }
    } else {
      setWeather(null);
      setWeatherCountry(null);
    }
  }, [search, countries, weatherCountry]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleDetail = (name) => {
    setSearch(name);
    setWeather(null);
  };

  if (!countries.length) {
    return <p>Loading countries...</p>;
  }
  return (
    <>
      <Search value={search} onChange={handleSearch} />
      {search && !showedCountries.length ? (
        <p>No founded countries</p>
      ) : showedCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : showedCountries.length === 1 ? (
        <CountryDetail country={showedCountries[0]} weather={weather} />
      ) : (
        <Countries countries={showedCountries} handleDetail={handleDetail} />
      )}
    </>
  );
}

export default App;
