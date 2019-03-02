const createErrors = require('http-errors');
const verify_token = 'cafrotoslovethocon';

let createWebHook = (req, res, next) => {
  if (req.query['hub.verify_token'] === verify_token) {
    res.send(req.query['hub.challenge']);
  }
  next(createErrors(401, "Wrong validate token"))
}

module.exports = {
  createWebHook
}