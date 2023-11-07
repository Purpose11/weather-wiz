import { useContext } from "react";
import { WeatherContext } from "../context/weatherContext";

export function useWeatherContext() {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useCartContext must be used within a MyProvider");
  }
  return context;
}
