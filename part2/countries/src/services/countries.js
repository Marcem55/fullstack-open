import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";
const baseUrlLocal = "http://localhost:3001/countries";

const openWeatherUrl = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = import.meta.env.VITE_OPENWEATHER_KEY;

const getAllCountries = () => {
  const request = axios.get(baseUrlLocal);
  return request
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching countries: ", error);
      throw error;
    });
};

const getWeather = (lat, lon) => {
  const request = axios.get(
    `${openWeatherUrl}?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
  );
  return request
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching weather: ", error);
      throw error;
    });
};

export default { getAllCountries, getWeather };
