// modules
var db = require('dbal')(process.env['DATABASE_URL']);
var _ = require('lodash');
var Promise = require('bluebird');
var models = require('../models');

var wrangleData = function (results) {

  var rows = [];

  _.each(results, function(result) {
    _.each(result, function(obj) {
      var scoreObj = {};
      scoreObj.url = obj.url;
      if (obj.hasOwnProperty('desktopScore')) {
        scoreObj.strategy = 'desktop';
        scoreObj.score = obj.desktopScore;
      } else {
        scoreObj.strategy = 'mobile';
        scoreObj.score = obj.mobileScore;
      }
      return rows.push(scoreObj);
    });
  });

  return rows;

};

// save score results to db
var saveResults = Promise.method(function(results) {
  var rows = wrangleData(results);
  return models.Score.bulkCreate(rows).then(function() {
    return rows;
  });
});

module.exports = saveResults;
