import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import WeatherContext from "./WeatherContext";

const WeatherContextProvider = ({ children }) => {
  const [searchedPlace, setSearchedPlace] = useState("");
  const [weatherToday, setWeatherToday] = useState({});
  const [weatherAll, setWeatherAll] = useState([]);
  const [currentLocation, setCurrentLocation] = useState([]);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [fetchWeatherError, setFetchWeatherError] = useState("");

  useEffect(() => {
    if (searchedPlace) {
      fetchWeather();
    }
  }, [searchedPlace]);

  const fetchWeather = async () => {
    setLoadingWeather(true);
    setFetchWeatherError("");
    setWeatherAll([]);
    setWeatherToday({});
    const options = {
      method: "GET",
      url: "https://visual-crossing-weather.p.rapidapi.com/forecast",
      params: {
        aggregateHours: "24",
        location: searchedPlace,
        contentType: "json",
        unitGroup: "metric",
        shortColumnNames: "0",
      },
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
        "X-RapidAPI-Host": "visual-crossing-weather.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      const requiredData = Object.values(response?.data?.locations)?.[0];
      setWeatherToday(requiredData?.values[0]);
      setWeatherAll(requiredData?.values);
      setCurrentLocation(requiredData?.address);
      setLoadingWeather(false);
    } catch (error) {
      console.error(error);
      setLoadingWeather(false);
      setFetchWeatherError(error?.response?.data);
    }
  };

  return (
    <WeatherContext.Provider
      value={{
        weatherToday,
        currentLocation,
        weatherAll,
        searchedPlace,
        setSearchedPlace,
        loadingWeather,
        fetchWeatherError,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherContextProvider;
