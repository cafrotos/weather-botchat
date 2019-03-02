const City = require('./city.json');
const request = require('request');
const setting = require('../config/setting.json')
const { WEATHER_CONDITION_CODES } = require('../constants')
const TOKEN_OPEN_WEATHER = process.env.TOKEN_OPEN_WEATHER;

let convertToUnsignedWord = (str) => {
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  return str;
} 

let getCityInfomationByName = (name) => {
  let cityName = name.toLowerCase();
  let cityNameUnsignedWord = convertToUnsignedWord(name);
  let cityInfo = City[cityName] ? City[cityName] : City[cityNameUnsignedWord];
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
  return new Promise((resolve, reject) => {
    let cityInfo;
    let openweatherUrl = setting.openweather;
    try {
      cityInfo = getCityInfomationByName(cityName);
    } catch (error) {
      reject(error);
    }
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