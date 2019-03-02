const createErrors = require('http-errors');
const verify_token = 'cafrotoslovethocon';
const FacebookEntry = require('../libs/FacebookEntry');

let createWebHook = (req, res, next) => {
  if (req.query['hub.verify_token'] === verify_token) {
    res.send(req.query['hub.challenge']);
  }
  else next(createErrors(401, "Wrong validate token"))
}

let webhookListener = (req, res, next) => {
  let data = req.body;
  let usersMessage = FacebookEntry.getFacebookMessageFromEntry(data);
  console.log(usersMessage)
  res.status(200).send('ok')
}

module.exports = {
  createWebHook,
  webhookListener
}