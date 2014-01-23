// modules
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var moment = require('moment');

// save score results to disk
var saveResults = function (results) {

  var allScores = {
    timestamp: moment().format(),
    results: results
  };

  var filename = 'data/' + 'pageSpeedScores_' + moment().format('YYYYMMDD') + '.json';

  fs.writeFile(filename, JSON.stringify(allScores, null, 2), function (err) {
    if (err) {
      return err;
    }
    console.log(filename + ' saved!');
  });

};

module.exports = saveResults;