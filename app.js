// modules
var Promise = require('bluebird');
var path = require('path');
var fs = require('fs');
var moment = require('moment');
var cronJob = require('cron').CronJob;
var time = require('time');

// timer vars
var timerStart = new Date().getTime();

//  time to run app in cron format
var timeToRun = '40 8 * * *';

// for sending notification emails
var email = require(path.join(__dirname, 'lib', 'sendEmail.js'));
var save = require(path.join(__dirname, 'lib', 'saveResults.js'));
var send = require(path.join(__dirname, 'lib', 'sendResults.js'));

// filename to save
var filename = 'pageSpeedScores_' + moment().format('YYYYMMDD') + '.json';

// for requesting page speed scores
var getScore = require(path.join(__dirname, 'lib', 'getScore.js'));

// query db for list of urls to get scores for
var getUrls = require(path.join(__dirname, 'lib', 'getUrls.js'));

// google page speed insights api key
var apiKey = process.env['PAGESPEED_API_KEY'];

// scoring strategies for page speed insights
var strategies = ['mobile', 'desktop'];

// get all the pagespeed scores, save them & email them
var getScores = function () {

  getUrls().then(function(rows) {

    var urls = [];
    for (var i = 0, len = rows.length; i < len; i++) {
      urls.push(rows[i].url);
    }
    return urls;

  }).map(function (url) {

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

    // temporary
    send(results);
    // save(results, filename);

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
