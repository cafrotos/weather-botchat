const TOKEN_PAGE = process.env.TOKEN_PAGE;
const request = require('request')
const setting = require('../config/setting.json')

let replyToUser = (userId, message) => {
  let messengerUrl = setting.messenger;
  request({
    url: messengerUrl,
    qs: {
      access_token: TOKEN_PAGE,
    },
    method: 'POST',
    json: {
      recipient: {
        id: userId
      },
      message: {
        text: message
      },
    }
  }, (err, res, body) => {
    if(err) console.log(err)
  })
}

module.exports = {
  replyToUser
}