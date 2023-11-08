import { useWeatherContext } from "../hooks/useWeatherContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { city, setCity, data, prevSearch, setPrevSearch } =
    useWeatherContext();
  const navigate = useNavigate();

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

  const handleGetWeather = (city: string) => {
    navigate(`/weatherInfo/${city}`);
    setPrevSearch([...prevSearch, city]);
  };

  const handleSearchClick = (search: string) => {
    setCity(search);
    handleGetWeather(search);
  };

  const removeSearch = (index: number) => {
    const updatedPrevSearch = [...prevSearch];
    updatedPrevSearch.splice(index, 1);

    setPrevSearch(updatedPrevSearch);
    localStorage.setItem("prevSearch", JSON.stringify(updatedPrevSearch));
  };

  return (
    <div className="lg:flex lg:justify-between h-[100%]">
      <div className="lg:w-[65%] w-full lg:h-screen h-fit lg:py-[50px] py-[20px] lg:pl-[50px] pl-[20px] lg:pr-[100px]  flex flex-col justify-between">
        <h1 className="text-white text-[15px] font-bold">Weather-wiz</h1>
        {data ? (
          <div className="text-white lg:flex items-center lg:-4 w-full text-center lg:text-start mt-[20px] lg:mt-0 lg:gap-5">
            <h1 className="text-5xl font-bold"> {data.main.temp_min}&deg;</h1>
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold">{data.name}</h1>
              <h1 className="lg:text-lg text-sm font-bold">
                {getDateAndTime()}
              </h1>
            </div>
            <div className="flex flex-col">
              <img
                src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                alt="weather icon"
                className="lg:h-[50px] w-[50px] mx-auto"
              />
              <h1 className="text-lg font-bold">{data.weather[0].main}</h1>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-white text-xl font-bold">
              Failed to fetch weather of the current location. Check your
              internet connectivity or enable your location.
            </h1>
          </>
        )}
      </div>
      <div className="lg:w-[35%] w-full bg-white/20 pl-[30px] pr-[5px] py-[25px]">
        <div className="w-[100%] rounded-md p-[5px] mt-[50px] h-[50px] bg-white flex items-center justify-between px-2">
          <input
            type="text"
            placeholder="Search for a city"
            className="border-none outline-none h-[40px] w-[80%]"
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            className="bg-[#0077BE] h-[35px] text-white rounded-md lg:w-[15%] w-[20%] text-sm"
            onClick={() => handleGetWeather(city)}
          >
            Search
          </button>
        </div>

        <div className="w-full h-[150px] border-b border-white mt-[20px] text-white">
          <h1 className="text-[15px]">Your Previous Searches</h1>
          <div className="w-full h-[100px] overflow-y-auto mt-[10px]">
            {prevSearch ? (
              prevSearch.map((search, index) => (
                <div
                  key={index}
                  className="w-full flex items-center justify-between mt-1 cursor-pointer"
                >
                  <h1 onClick={() => handleSearchClick(search)}>{search}</h1>
                  <div
                    className="text-red-500 bg-[#CBCBCB] text-xl w-[30px] h-[30px] flex items-center justify-center cursor-pointer rounded-sm font-bold"
                    onClick={() => removeSearch(index)}
                  >
                    x
                  </div>
                </div>
              ))
            ) : (
              <h1>No searches yet</h1>
            )}
          </div>
        </div>
        {data ? (
          <div className="w-full mt-[20px] text-white font-bold h-fit">
            <h1>Current Weather Location</h1>
            <div className="flex items-center justify-between mt-[10px]">
              <h1>Humidity</h1>
              <h1> {data.main.humidity}%</h1>
            </div>
            <div className="flex items-center justify-between  mt-[10px]">
              <h1>Temperature</h1>
              <h1> {data.main.temp}&deg;C</h1>
            </div>
            <div className="flex items-center justify-between  mt-[10px]">
              <h1>Wind Speed</h1>
              <h1>{data.wind.speed}m/s</h1>
            </div>
          </div>
        ) : (
          ""
        )}
        <button
          className="bg-white text-[#0077BE] text- h-[50px] lg:w-[45%]  w-[60%] rounded-md mt-[20px] border-2 border-[#0077BE]"
          onClick={() =>
            alert("Check previous searches to see saved locations")
          }
        >
          View Saved Locations
        </button>
      </div>
    </div>
  );
};

export default Home;
