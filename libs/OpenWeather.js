const City = require('./city.json');
const request = require('request');
const setting = require('../config/setting.json')
const { WEATHER_CONDITION_CODES } = require('../constants')
const TOKEN_OPEN_WEATHER = process.env.TOKEN_OPEN_WEATHER;

let getCityInfomationByName = (name) => {
  name = name.toLowerCase();
  let cityInfo = City[name] ? City[name] : null;
  if (!cityInfo) throw new Error("Tỉnh/thành phố hiện tại chưa được hỗ trợ, vui lòng thử lại!");
  return cityInfo;
}

let convertCityWeatherInformation = (data) => {
  if (typeof data !== 'object') {
    data = JSON.parse(data);
  }
  let now = new Date()
  let weather = [];
  data.weather.map(weatherInfo => {
    let weatherName = WEATHER_CONDITION_CODES[weatherInfo.id];
    weather.push(weatherName);
  })
  let response = `Giờ hiện tại: ${now.getHours()} giờ ${now.getMinutes()} phút,`
    + `\nThời tiết: ${weather.toString()},`
    + `\nNhiệt độ: ${data.main.temp}°C,`
    + `\nĐộ ẩm: ${data.main.humidity}%,`
    + `\nTốc độ gió: ${data.wind.speed} m/s`
  return response;
}

let getCityWeatherInformation = (cityName) => {
  let cityInfo = getCityInfomationByName(cityName);
  let openweatherUrl = setting.openweather;
  return new Promise((resolve, reject) => {
    request({
      url: openweatherUrl,
      qs: {
        id: cityInfo.id,
        appid: TOKEN_OPEN_WEATHER,
        units: "metric"
      },
      method: 'GET',
    }, (err, res, body) => {
      if (err) reject(err);
      else {
        let response = convertCityWeatherInformation(body);
        resolve(response);
      }
    })
  })
}

module.exports = {
  getCityWeatherInformation
}