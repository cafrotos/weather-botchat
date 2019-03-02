const TOKEN_PAGE = process.env.TOKEN_PAGE;
const request = require('request')

let replyToUser = (userId, message) => {
  console.log(TOKEN_PAGE)
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
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
  })
}

module.exports = {
  replyToUser
}