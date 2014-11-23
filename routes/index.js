var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/', function(req, res) {
  models.Score
    .findAll()
    .then(function(response) {
      res.render('index', {
        title: 'Page Speed Tracker',
        json: JSON.stringify(response, null, 2)
      });
    });
});

module.exports = router;
