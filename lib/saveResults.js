// modules
var db = require('dbal')(process.env['DATABASE_URL']);
var moment = require('moment');

var convert = function (obj) {

  var row = [];

  row.push(obj.url);

  if (obj.hasOwnProperty('desktopScore')) {
    row.push('desktop', obj.desktopScore);
  } else {
    row.push('mobile', obj.mobileScore);
  }

  row.push(moment().format(), moment().format());

  return row;

};

// save score results to db
var saveResults = function (result) {

  var row = convert(result);
  var query = 'INSERT into "Scores" (url, strategy, score, "createdAt", "updatedAt") VALUES($1, $2, $3, $4, $5) RETURNING id';

  return db.query(query, row);

};

module.exports = saveResults;