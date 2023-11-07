import { ReactNode, createContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";

interface TData {
  coord: { lon: number; lat: number };
  weather: Tweather[];
  base?: string;
  main: {
    temp: number;
    humidity: number;
    temp_max: number;
    temp_min: number;
    pressure: number;
  };

  wind: { speed: number; deg: number; gust: number };
  clouds?: { all: number };
  sys: { country: string };
  timezone: number;
  dt: number;
  id: number;
  name: string;
  cod: number;
}

interface Tweather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface TweatherContext {
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  data: TData | null;
  getWeatherInfo: () => void;
  prevSearch: string[] | [];
  setPrevSearch: React.Dispatch<React.SetStateAction<[] | string[]>>;
}

export const WeatherContext = createContext<TweatherContext | null>(null);

export const WeatherContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [city, setCity] = useState("");
  const [prevSearch, setPrevSearch] = useState<string[] | []>(() => {
    // Load the 'prevSearch' array from local storage when the component is initialized.
    const storedPrevSearch = localStorage.getItem("prevSearch");
    return storedPrevSearch ? JSON.parse(storedPrevSearch) : [];
  });
  const [data, setData] = useState<TData | null>(null);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a06b40e3ad22d9d640fe7cded2f4daf0`;

  const getWeatherInfo = () => {
    axios.get(url).then((response) => {
      setData(response.data);
      console.log(response.data);
    });
  };

  useEffect(() => {
    // Save the 'prevSearch' array to local storage whenever it changes.
    localStorage.setItem("prevSearch", JSON.stringify(prevSearch));
  }, [prevSearch]);

  return (
    <WeatherContext.Provider
      value={{
        city,
        setCity,
        data,
        getWeatherInfo,
        prevSearch,
        setPrevSearch,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
