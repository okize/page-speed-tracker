// modules
var Promise = require('bluebird');
var moment = require('moment');
var path = require('path');
var fs = require('fs');
var cronJob = require('cron').CronJob;
var time = require('time');

// timer vars
var timerStart = new Date().getTime();

// for sending notification emails
var email = require(path.join(__dirname, 'lib', 'sendEmail.js'));

// for requesting page speed scores
var getScore = require(path.join(__dirname, 'lib', 'getScore.js'));

// urls to retreive page speed scores for
var urls = require('./lib/urls.json');

// google page speed insights api key
var apiKey = process.env['PAGESPEED_API_KEY'];

// scoring strategies for page speed insights
var strategies = ['mobile', 'desktop'];

// sets up cron job for getting & saving page speed scores
var job = new cronJob({
  cronTime: '0 8 * * *',
  // cronTime: process.env['CRON_TIME'],
  onTick: function () {
    return getScores();
  },
  start: true,
  timeZone: 'America/New_York'
});

function getScores () {

  // loop through URLs to be scored for each strategy
  // then save the results to disk
  Promise.all(urls.map(function (url) {

    return Promise.all(
      strategies.map(function (strategy) {
        return getScore(url, strategy, apiKey).spread(function (res, body) {
          var score = {url: url};
          score[strategy + 'Score'] = JSON.parse(body).score;
          return score;
        });
      })
    );

  })).then(function (results) {

    var data = {
      timestamp: moment().format(),
      timer: (new Date().getTime() - timerStart)/1000,
      results: results
    };
    return email('Page speed scores saved', data);

  }).catch(function (err) {

    console.error('Error: ' + err);

  });

}