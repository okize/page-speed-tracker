// for timing results
var timerStart = new Date().getTime();

// modules
var Promise = require('bluebird');
var path = require('path');
var fs = require('fs');
var moment = require('moment');
var cronJob = require('cron').CronJob;
var time = require('time'); //required by cron

//  time to run app in cron format
var timeToRun = '0 8 * * *';

// google page speed insights api key
var apiKey = process.env['PAGESPEED_API_KEY'];

// for sending notification emails
var email = require(path.join(__dirname, 'lib', 'sendEmail.js'));

// save the results to a json file locally
var saveResultsToDisk = require(path.join(__dirname, 'lib', 'saveResultsToDisk.js'));

// for requesting page speed scores
var getScore = require(path.join(__dirname, 'lib', 'getScore.js'));

// query db for list of urls to retreive page speed scores for
var getUrls = require(path.join(__dirname, 'lib', 'getUrls.js'));

// scoring strategies for page speed insights
var strategies = ['mobile', 'desktop'];

// get all the pagespeed scores, save them & email them
var getScores = function () {

  getUrls().map(function (url) {

    return Promise.all(
      strategies.map(function (strategy) {
        return getScore(url, strategy, apiKey).spread(function (res, body) {
          var score = {url: url};
          score[strategy + 'Score'] = JSON.parse(body).score;
          return score;
        });
      })
    );

  }).then(function (results) {

    var filename = 'pageSpeedScores_' + moment().format('YYYYMMDD') + '.json';
    saveResultsToDisk(results, filename);
    return results;

  }).then(function (results) {

    var timeCount = (new Date().getTime() - timerStart)/1000;

    var data = {
      timestamp: moment().format(),
      timer: timeCount,
      results: results
    };
    return email('Page speed scores saved', data);

  }).catch(function (err) {

    console.error('Error thrown: ' + err);

  });

};

// sets up cron job for getting & saving page speed scores
var job = new cronJob({
  cronTime: timeToRun,
  onTick: function () {
    return getScores();
  },
  start: true,
  timeZone: 'America/New_York'
});