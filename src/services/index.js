const { getCityByName, getCityForecast, registerCity} = require('./utils');

const getWeather = (cityName, token) => {
  const data = await getCityByName(cityName, token);
  console.log(`Do you wish to register ${data}?`)
}

getWeather(data, token);