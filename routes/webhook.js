const createErrors = require('http-errors');
const verify_token = 'cafrotoslovethocon';
const FacebookEntry = require('../libs/FacebookEntry');
const FacebookReply = require('../libs/FacebookReply');
const OpenWeather = require('../libs/OpenWeather');

let createWebHook = (req, res, next) => {
  if (req.query['hub.verify_token'] === verify_token) {
    res.send(req.query['hub.challenge']);
  }
  else next(createErrors(401, "Wrong validate token"))
}

let webhookListener = (req, res, next) => {
  let data = req.body;
  let userMessages
  try {
    userMessages = FacebookEntry.getFacebookMessageFromEntry(data);
  } catch (error) {
    console.log(error);
    return;
  }
  userMessages.map(userMessage => {
    OpenWeather.getCityWeatherInformation(userMessage.message)
      .then(weatherInfo => {
        FacebookReply.replyToUser(userMessage.id, weatherInfo);
      })
      .catch(err => {
        FacebookReply.replyToUser(userMessage.id, err.message || "Hệ thống lỗi, vui lòng thử lại lúc khác!");
      })
  })
  res.status(200).send('ok')
}

module.exports = {
  createWebHook,
  webhookListener
}