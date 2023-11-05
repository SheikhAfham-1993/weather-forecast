import { useEffect, useRef, useState } from 'react'
import WeatherForecast from '../components/WeatherForecast'
import axios from 'axios'

const Dashboard = () => {
  let defaultLocation = 'Mannheim'
  const locationRef = useRef(defaultLocation)
  const [forecastData, setForecastData] = useState(null)
  const [currentWeather, setCurrentWeather] = useState(null)

  const getCurrentWeather = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}weather/getWeather/${locationRef.current.value}`
      )
      setCurrentWeather(response.data)
    } catch (error) {
      setCurrentWeather(null)
    }
  }

  const getWeatherForecast = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}weather/getWeatherForecast/${locationRef.current.value}`
      )
      setForecastData(response.data)
    } catch (error) {
      setForecastData(null)
    }
  }

  useEffect(() => {
    getCurrentWeather()
    getWeatherForecast()
  }, [])

  return (
    <div className="h-fit lg:h-screen bg-gray-600 px-5 py-5">
      <div className="flex flex-col m-auto justify-center items-center gap-4 max-w-full lg:max-w-3xl h-full">
        <input
          defaultValue={defaultLocation}
          ref={locationRef}
          onChange={(e) => (locationRef.current.value = e.target.value)}
          type="text"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              getWeatherForecast(e.target.value)
              getCurrentWeather(e.target.value)
            }
          }}
          placeholder="Search"
          className="border border-gray-200 rounded-lg p-2 flex flex-col w-full lg:w-1/4"
        />
        {currentWeather && (
          <div className="flex flex-col justify-center gap-4 w-full">
            <div className="bg-gray-300 border text-black border-gray-200 rounded-lg p-5 flex flex-col space-y-2 items-center w-full col-span-2">
              <span className="text-3xl font-bold ">Current Weather</span>
              <div className="flex flex-row items-center space-x-5">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold ">
                    {currentWeather?.name}
                  </span>
                  <span className="text-xl font-bold ">
                    {currentWeather?.main?.temp} °C
                  </span>
                </div>

                <img
                  className="rounded-full w-[120px] h-[120px]"
                  src={`https://openweathermap.org/img/wn/${currentWeather?.weather[0].icon}@2x.png`}
                  alt="weather"
                />
              </div>

              <span className="text-lg font-bold  capitalize">
                {currentWeather?.weather[0].description}
              </span>
              <div className="flex flex-col text-lg font-bold  gap-y-1 capitalize">
                <span>{`Wind Speed: ${currentWeather?.wind.speed} m/s`}</span>
                <span>{`pressure: ${currentWeather?.main.pressure} hPa`}</span>
                <span>{`humidity: ${currentWeather?.main.humidity} %`}</span>
              </div>
            </div>
            <div className="col-span-4">
              <WeatherForecast forecastData={forecastData} />
            </div>
          </div>
        )}
        {!currentWeather && (
          <div className="flex justify-center items-center h-full text-white text-3xl font-bold">
            The city could not be found
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
