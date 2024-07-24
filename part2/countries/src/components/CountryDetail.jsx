import CountryWeather from "./CountryWeather";

const CountryDetail = ({ country, weather }) => {
  const name = country.name.common;
  return (
    <div>
      <h1>{name}</h1>
      <p>Capital: {country.capital.join(" ")}</p>
      <p>Area: {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      {!weather ? (
        <p>Loading weather data...</p>
      ) : (
        <CountryWeather name={name} weather={weather} />
      )}
    </div>
  );
};

export default CountryDetail;
