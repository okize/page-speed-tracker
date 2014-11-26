var router = require('express').Router();
var moment = require('moment');
var _ = require('lodash');
var models = require('../models');

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
            res
              .status(200)
              .json({
                urlId: req.params.urlId,
                url: url,
                scores: scores
              });
          });
      })
      .error(function(error) {
        console.error(error);
        res.status(404).send('No scores found!');
      });
  });

module.exports = router;
