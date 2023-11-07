import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { WeatherContextProvider } from "./context/weatherContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <WeatherContextProvider>
        <App />
      </WeatherContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
