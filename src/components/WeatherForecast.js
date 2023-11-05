const WeatherForecast = ({ forecastData }) => {
  return (
    forecastData && (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {forecastData?.list?.map((list, index) => (
          <div
            key={index}
            className="w-full lg:w-[250px] bg-gray-300 border border-gray-200 rounded-lg p-3 flex flex-col"
          >
            <span className="text-lg font-bold ">
              {new Date(list.dt_txt).toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
              })}
            </span>
            <div className="flex flex-row items-center">
              <span className="text-xl font-bold  capitalize">
                {list.weather[0].description}
              </span>
              <img
                className="w-12 h-12 mt-1"
                src={`https://openweathermap.org/img/wn/${list.weather[0].icon}@2x.png`}
                alt="weather"
              />
            </div>
            <span>
              Temprature: <b>{list.main.temp} °C</b>
            </span>
            <span>
              Feels like: <b>{list.main.feels_like} °C</b>
            </span>
            <span>
              Wind speed: <b>{list.wind.speed} m/s</b>
            </span>
            <span>
              Humidity: <b>{list.main.humidity} %</b>
            </span>
            <span>
              Humidity: <b>{list.main.pressure} hPa</b>
            </span>
          </div>
        ))}
      </div>
    )
  )
}

export default WeatherForecast
