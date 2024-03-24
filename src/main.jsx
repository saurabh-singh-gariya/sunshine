import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import WeatherContextProvider from "./context/WeatherContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <WeatherContextProvider>
    <App />
  </WeatherContextProvider>
);
