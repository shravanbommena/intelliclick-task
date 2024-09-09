/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

function Weather(props) {
  console.log(props.match.params);
  const cityName = props.match.params.name;

  const [weatherData, setWeatherData] = useState({});
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchWeatherData = async () => {
    try {
      // API city works for both city or zip code
      // still
      // find whether searchQuery is zip code or city name
      // by using isNaN function
      // it returns true if it is string
      // false if it is number
      // TO-DO : need more work here

      // call city search
      // console.log("calling city api");
      const data = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${
          import.meta.env.VITE_REACT_APP_API_KEY
        }`
      );
      console.log(data);

      setWeatherData(data.data);
      setError(false);
    } catch (error) {
      console.log(error.message);
      setError(true);
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const convertDtValueToDateTime = (dt) => {
    let unix_timestamp = dt;

    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds
    var date = new Date(unix_timestamp * 1000);

    let n = date.toLocaleString([], {
      hour12: true,
      hour: "numeric",
      minute: "2-digit",
    });
    const dateFormat =
      date.toLocaleString("default", { month: "short" }) +
      " " +
      date.getDate() +
      ", " +
      n;
    return dateFormat;
  };

  const convertKelvinToCelcius = (temp) => {
    const celciusTemp = temp - 273.15;
    // rounds the number to two decimals
    return Math.round(celciusTemp * 100) / 100;
  };

  const displayData = Object.keys(weatherData).length !== 0;

  let iconId;
  if (displayData) {
    iconId = weatherData.weather[0].icon;
  }

  return (
    <div>
      {displayData && (
        <div className="search-results flex flex-col items-center justify-center">
          <h1 className="font-semibold text-2xl my-3">Weather Result </h1>
          <div className="weather-card">
            <div>
              <p>{convertDtValueToDateTime(weatherData.dt)}</p>
              <h2>{weatherData.name}</h2>
              <p>{weatherData.weather[0].description}</p>
              <p>Humidity: {weatherData.main.humidity} %</p>
              <p>Wind: {weatherData.wind.speed}m/s </p>
            </div>

            <div className="weather-data">
              <img
                src={`https://openweathermap.org/img/wn/${iconId}@2x.png`}
                alt="weather icon"
                width={100}
                height={100}
              />
              <h3 className="weather-temp">
                {convertKelvinToCelcius(weatherData.main.temp)}
                °C
              </h3>
            </div>
          </div>
        </div>
      )}
      {error && (
        <div>
          <p className="text-red-400">{errorMessage}</p>
        </div>
      )}
    </div>
  );
}

export default Weather;
