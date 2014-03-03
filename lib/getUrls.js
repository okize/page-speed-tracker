// modules
var db = require('dbal')(process.env['DATABASE_URL']);

var processResults = function (rows) {

  var urls = [];
  for (var i = 0, len = rows.length; i < len; i++) {
    urls.push(rows[i].url);
  }
  return urls;

};

var getUrls = function() {

  var query = 'select * from "Urls"';

  return db.query(query).then(function(results) {
    return processResults(results.rows);
  });

};

module.exports = getUrls;