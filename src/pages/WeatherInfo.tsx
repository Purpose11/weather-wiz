import { useWeatherContext } from "../hooks/useWeatherContext";
import { useEffect } from "react";
import { MdArrowBack } from "react-icons/md";
import { Link } from "react-router-dom";

const WeatherInfo = () => {
  const { getWeatherInfo, data } = useWeatherContext();

  useEffect(() => {
    getWeatherInfo(); // Fetch data when the city has changed

    return () => getWeatherInfo();
  }, []);

  const getDateAndTime = () => {
    if (data) {
      const timestamp = data?.dt;
      const utcDate = new Date(timestamp * 1000);
      const localDate = new Date(utcDate.getTime() + data.timezone * 1000);

      const optionsTime = {
        hour: "2-digit" as const,
        minute: "2-digit" as const,
        hour12: true,
      };

      const optionsDate = {
        weekday: "long" as const,
        year: "numeric" as const,
        month: "long" as const,
        day: "numeric" as const,
      };

      const timeString = new Intl.DateTimeFormat("en-US", optionsTime).format(
        localDate
      );
      const dateString = new Intl.DateTimeFormat("en-US", optionsDate).format(
        localDate
      );

      return `${timeString} - ${dateString}`;
    }
  };

  return (
    <div
      className={`flex items-center justify-center ${
        data ? "h-[100%] lg:h-screen" : "h-screen"
      }`}
    >
      <div className="h-fit lg:w-[60%] w-[90%] rounded-xl shadow-md bg-white/20 lg:px-[40px] px-[20px] py-[50px]">
        <Link to="/" className="">
          <MdArrowBack className="text-3xl text-black rounded-full bg-[#CCCCCC]" />
        </Link>
        {data ? (
          <>
            <div className="w-full lg:h-[70px] mt-5 flex flex-col-reverse lg:flex-row lg:items-center justify-between gap-[25px] lg:gap-0">
              <div>
                <h1 className="text-white font-bold lg:text-4xl text-2xl">
                  {data.name},<span className="ml-2">{data.sys.country}</span>
                </h1>
                <h1 className="text-white text-sm lg:mt-[6px] mt-[15px]">
                  {getDateAndTime()}
                </h1>
              </div>

              <button
                className="bg-[#0077BE] text-white h-[40px] lg:w-[18%] w-[60%] rounded-md mx-auto lg:mx-0"
                onClick={() => alert("Location saved succesfully")}
              >
                Save Location
              </button>
            </div>
            <div className="w-full h-fit flex flex-col lg:flex-row items-center mt-[20px] lg:ml-[20px]">
              <div className="flex items-center lg:justify-between justify-around lg:border-r lg:border-white lg:w-[45%] w-full lg:h-[200px] h-fit pr-[15px]">
                <img
                  src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                  alt="weather icon"
                  className="h-[100px]"
                />
                <div className="flex flex-col items-center">
                  <h1 className="text-white lg:text-5xl text-3xl font-bold">
                    {data.main.temp}&deg;
                  </h1>
                  <h1 className="text-white text-sm mt-1">
                    {data.weather[0].main}
                  </h1>
                </div>
              </div>
              <div className="flex flex-col justify-between lg:w-[50%] w-full h-[200px] pl-[30px] py-[15px]">
                <div className="w-full grid grid-cols-3">
                  <div>
                    <h1 className="text-white font-bold">
                      {data.main.temp_max}
                    </h1>
                    <h1 className="text-white">High</h1>
                  </div>
                  <div>
                    <h1 className="text-white font-bold">
                      {data.wind.speed}mph
                    </h1>
                    <h1 className="text-white">Wind</h1>
                  </div>
                  <div>
                    <h1 className="text-white font-bold">
                      {data.main.humidity}%
                    </h1>
                    <h1 className="text-white">Humidity</h1>
                  </div>
                </div>
                <div className=" w-[80%] grid grid-cols-3">
                  <div>
                    <h1 className="text-white font-bold">
                      {data.main.temp_min}
                    </h1>
                    <h1 className="text-white">Low</h1>
                  </div>
                  <div>
                    <h1 className="text-white font-bold">
                      {data.main.pressure}in
                    </h1>
                    <h1 className="text-white">Pressure</h1>
                  </div>
                  <div>
                    <h1 className="text-white font-bold">
                      {data.main.humidity}%
                    </h1>
                    <h1 className="text-white">Precipitation</h1>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
        <button
          className="bg-white text-[#0077BE] text- h-[50px] lg:w-[35%] w-[80%] rounded-md mt-[20px] border-2 border-[#0077BE] mx-auto block"
          onClick={() => alert("See home page to view all saved locations")}
        >
          View Saved Location
        </button>
      </div>
    </div>
  );
};

export default WeatherInfo;
