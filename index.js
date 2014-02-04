// modules
var Promise = require('bluebird');
var moment = require('moment');
var getScore = require('./getScores.js');
var saveResults = require('./saveResults.js');
// var sendResults = require('./sendResults.js');

// urls to retreive page speed scores for
var urls = require('./urls.json');

// google page speed insights api key
var apiKey = process.env['PAGESPEED_API_KEY'];

// scoring strategies for page speed insights
var strategies = ['mobile', 'desktop'];

// filename to save
var filename = 'pageSpeedScores_' + moment().format('YYYYMMDD') + '.json';

console.time('time-to-get-scores');

// loop through URLs to be scored for each strategy
// then save the results to disk
Promise.all(urls.map(function (url) {

  return Promise.all(
    strategies.map(function (strategy) {
      return getScore(url, strategy, apiKey).spread(function (response, body) {
        var score = {url: url};
        score[strategy + 'Score'] = JSON.parse(body).score;
        return score;
      });
    })
  );

})).then(function (results) {

  return saveResults(results, filename);

}).then(function (response) {

  console.log(response);

}).finally(function () {

  console.timeEnd('time-to-get-scores');

}).catch(function (err) {

  console.error('Error: ' + err);

});