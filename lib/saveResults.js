// modules
var moment = require('moment');

// save score results to disk
var saveResults = function (results, filename) {

  var allScores = {
    timestamp: moment().format(),
    results: results
  };

  console.log('saving results');

};

module.exports = saveResults;