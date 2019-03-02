var express = require('express');
var webhook = require('./webhook');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).send('ok')
});

router.get('/webhook', webhook.createWebHook);
router.post('/webhook', webhook.webhookListener);

module.exports = router;
