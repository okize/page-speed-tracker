// modules
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var moment = require('moment');
var filename = 'pageSpeedScores_' + moment().format('YYYYMMDD') + '.json';

// save score results to disk
var saveResults = function (results) {

  var allScores = {
    timestamp: moment().format(),
    results: results
  };

  return fs.writeFile('data/' + filename, JSON.stringify(allScores, null, 2), function (err) {
    if (err) throw err;
    console.log('saved ' + filename);
    return filename + ' saved!';
  });

};

module.exports = saveResults;