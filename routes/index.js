var router = require('express').Router();
var csv = require('express-csv');
var moment = require('moment');
var _ = require('lodash');
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

router.get('/export', function(req, res) {
  models.Score
    .findAll({
      order: [
        ['id', 'ASC']
      ]
    })
    .then(function(scores) {
      res.csv(_.pluck(scores, 'dataValues'));
    });
});

module.exports = router;
