var express = require('express');
var router = express.Router();
var moment = require('moment');
var _ = require('lodash');
var models = require('../models');

router.get('/', function(req, res) {
  models.Score
    .findAll({
      // where: {
      //   url:'http://www.patientslikeme.com/'
      // },
      order: [
        ['id', 'DESC']
      ]
    })
    .then(function(scores) {
      res.render('index', {
        title: 'Page Speed Tracker',
        scores: scores
      });
    });
});

module.exports = router;
