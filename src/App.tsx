import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import WeatherInfo from "./pages/WeatherInfo";
import { useWeatherContext } from "./hooks/useWeatherContext";

function App() {
  const { data } = useWeatherContext();

  const getWeatherClassName = () => {
    if (data && data.weather[0].main === "Rain") {
      return "rainy-background";
    } else if (data && data.weather[0].main === "Clouds") {
      return "cloudy-background";
    } else if (data && data.weather[0].main === "Thunderstorm") {
      return "thunderstorm-background";
    } else {
      return "sunny-background";
    }
  };

  return (
    <div className={`main ${getWeatherClassName()}`}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weatherInfo/:city" element={<WeatherInfo />} />
      </Routes>
    </div>
  );
}

export default App;
