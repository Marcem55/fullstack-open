import { useState, useEffect } from "react";
import countrieService from "./services/countries";
import "./App.css";

const CountryDetail = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital.join(" ")}</p>
      <p>Area: {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
    </div>
  );
};

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [showedCountries, setShowedCountries] = useState([]);

  useEffect(() => {
    countrieService.getAllCountries().then((response) => {
      setCountries(response);
    });
  }, []);

  const handleSearch = (e) => {
    console.log("e value:", e.target.value);
    console.log("search:", search);
    setSearch(e.target.value);
    setShowedCountries(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  if (!countries.length) {
    return <p>Loading countries...</p>;
  }
  return (
    <>
      Find countries{" "}
      <input type="text" onChange={handleSearch} value={search} />
      {search && !showedCountries.length ? (
        <p>No founded countries</p>
      ) : showedCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : showedCountries.length === 1 ? (
        <CountryDetail country={showedCountries[0]} />
      ) : (
        showedCountries.map((country) => (
          <p key={country.name.official}>{country.name.common}</p>
        ))
      )}
    </>
  );
}

export default App;
