const CountryWeather = ({ name, weather }) => {
  return (
    <div>
      <h2>Weather in {name}</h2>
      <p>Temperature: {weather.main.temp} °C</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={`${name} weather`}
      />
      <p>Wind: {weather.wind.speed} m/s</p>
    </div>
  );
};

export default CountryWeather;
