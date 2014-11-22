// modules
var db = require('dbal')(process.env['DATABASE_URL']);
var _ = require('lodash');
var moment = require('moment');

var convert = function (results) {

  var rows = [];

  _.each(results, function(result) {
    _.each(result, function(obj) {
      var row = [];
      row.push(obj.url);
      if (obj.hasOwnProperty('desktopScore')) {
        row.push('desktop', obj.desktopScore);
      } else {
        row.push('mobile', obj.mobileScore);
      }
      row.push(moment().format(), moment().format());
      rows.push(row);
    });
  });

  return rows;

};

// save score results to db
var saveResults = function (results) {

  var rows = convert(results);
  var query = '';

  _.each(rows, function(row) {
    query = 'INSERT into "Scores" (url, strategy, score, "createdAt", "updatedAt") VALUES($1, $2, $3, $4, $5) RETURNING id';
    return db.query(query, row);
  });

};

module.exports = saveResults;
