const createErrors = require('http-errors');
const verify_token = 'cafrotoslovethocon';
const FacebookEntry = require('../libs/FacebookEntry');
const FacebookReply = require('../libs/FacebookReply');

let createWebHook = (req, res, next) => {
  if (req.query['hub.verify_token'] === verify_token) {
    res.send(req.query['hub.challenge']);
  }
  else next(createErrors(401, "Wrong validate token"))
}

let webhookListener = (req, res, next) => {
  let data = req.body;
  let userMessages = FacebookEntry.getFacebookMessageFromEntry(data);
  userMessages.map(userMessage => {
    FacebookReply.replyToUser(userMessage.id, userMessage.message);
  })
  res.status(200).send('ok')
}

module.exports = {
  createWebHook,
  webhookListener
}