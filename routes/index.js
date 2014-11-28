var router = require('express').Router();
var moment = require('moment');
var models = require('../models');

router.get('/', function(req, res) {
  res.render('index', {
    title: 'Page Speed scores over time'
  });
});

router.get('/data', function(req, res) {
  models.Score
    .findAll({
      order: [
        ['id', 'DESC']
      ]
    })
    .then(function(scores) {
      res.render('data', {
        title: 'Page Speed Tracker Datatable',
        scores: scores
      });
    });
});

module.exports = router;
