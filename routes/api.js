var router = require('express').Router();
var moment = require('moment');
var _ = require('lodash');
var models = require('../models');

router
  .route('/url')
  .get(function (req, res) {
    models.Url
      .findAll()
      .then(function(urls) {
        res
          .status(200)
          .json(urls);
      });
  });

router
  .route('/score')
  .get(function (req, res) {
    models.Score
      .findAll()
      .then(function(scores) {
        res
          .status(200)
          .json({
            scores: scores
          });
      });
  });

router
  .route('/score/:urlId')
  .get(function (req, res) {
    models.Url
      .find(req.params.urlId)
      .then(function(urls) {
        var url = urls.dataValues.url;
        models.Score
          .findAll({
            where: {
              url: url
            },
            order: [
              ['id', 'DESC']
            ]
          })
          .then(function(scores) {
            var data = [[],[]];
            var dat = {};
            _.map(scores, function(obj) {
              dat = {
                date: moment(obj.createdAt).format('YYYY-MM-DD'),
                score: obj.score,
                strategy: obj.strategy
              };
              if (obj.strategy === 'desktop') {
                data[0].push(dat);
              } else {
                data[1].push(dat);
              }
            });
            res
              .status(200)
              .json({
                urlId: req.params.urlId,
                url: url,
                scores: data
              });
          });
      })
      .error(function(error) {
        console.error(error);
        res.status(404).send('No scores found!');
      });
  });

module.exports = router;
