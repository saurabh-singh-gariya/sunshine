import { useEffect, useState, useContext } from "react";
import * as _ from "lodash";
import WeatherContext from "./context/WeatherContext";
import WeatherCard from "./components/WeatherCard";
import MiniCard from "./components/MiniCard";
import search from "./assets/search.svg";
import { Spinner } from "@material-tailwind/react";

function App() {
  const {
    weatherToday,
    weatherAll,
    currentLocation,
    setSearchedPlace,
    loadingWeather,
    fetchWeatherError,
  } = useContext(WeatherContext);

  useEffect(() => {
    console.log(weatherToday);
  }, [weatherToday]);

  const [inputValue, setInputValue] = useState("");

  const searchCity = () => {
    setSearchedPlace(inputValue);
    setInputValue("");
  };

  return (
    <div className="w-full h-screen text-black px-8 ">
      <nav className="w-full p-3 flex justify-between items-center">
        <h1 className="font-bold tracking-wide text-3xl">Sunshine Weather</h1>
        <div className="bg-white w-[20rem] overflow-hidden shadow-2xl rounded flex items-center p-2 gap-2">
          <input
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                // sumit the form
                searchCity();
              }
            }}
            type="text"
            placeholder="Search city"
            className="focus:outline-none w-full text-[#212121] text-lg"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <img src={search} alt="search" className="w-[2.5rem] h-[1.5rem]" />
        </div>
      </nav>
      <main className="w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center">
        {loadingWeather ? (
          <Spinner className="h-12 w-12" />
        ) : !_.isEmpty(weatherToday) && !_.isEmpty(weatherAll) ? (
          <>
            <WeatherCard
              place={currentLocation}
              windspeed={weatherToday.wspd}
              humidity={weatherToday.humidity}
              temperature={weatherToday.temp}
              heatIndex={weatherToday.heatindex}
              iconString={weatherToday.conditions}
              conditions={weatherToday.conditions}
            />

            <div className="flex justify-center gap-8 flex-wrap w-[60%]">
              {weatherAll?.slice(1, 7).map((curr) => {
                return (
                  <MiniCard
                    key={curr.datetime}
                    time={curr.datetime}
                    temp={curr.temp}
                    iconString={curr.conditions}
                  />
                );
              })}
            </div>
          </>
        ) : fetchWeatherError !== "" ? (
          <> {fetchWeatherError}</>
        ) : (
          <>Please Search Your City Name</>
        )}
      </main>
    </div>
  );
}

export default App;
