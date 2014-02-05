// modules
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var moment = require('moment');

// save score results to disk
var saveResults = function (results, filename) {

  var allScores = {
    timestamp: moment().format(),
    results: results
  };

  return fs.writeFile('data/' + filename, JSON.stringify(allScores, null, 2), function (err) {
    if (err) throw err;
    return filename + ' saved!';
  });

};

module.exports = saveResults;