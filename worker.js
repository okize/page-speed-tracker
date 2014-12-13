// modules
var Promise = require('bluebird');
var path = require('path');
var fs = require('fs');
var cronJob = require('cron').CronJob;
var time = require('time'); //required by cron
var moment = require('moment');
var models = require('./models');

// the time to run app in cron format
var timeToRun = '0 6 * * *';

// query db for list of urls to retreive page speed scores for
var getUrls = require(path.join(__dirname, 'lib', 'getUrls.js'));

// requests page speed scores
var getScore = require(path.join(__dirname, 'lib', 'getScore.js'));

// save the results to db
var save = require(path.join(__dirname, 'lib', 'saveResults.js'));

// send notification emails
var email = require(path.join(__dirname, 'lib', 'sendEmail.js'));

// scoring strategies for page speed insights
var strategies = ['mobile', 'desktop'];

// get all the pagespeed scores, save them & email them
var getScores = function () {

  // for timing results
  var timerStart = new Date().getTime();

  console.log('getting PageSpeed scores for urls...');

  getUrls().map(function (url) {

    var data = {};
    var score = 0;

    return Promise.all(
      strategies.map(function (strategy) {
        return getScore(url, strategy).spread(function (res, body) {
          data = JSON.parse(body);
          if (data.error) {
            throw new Error(data.error.message);
          }
          score = {url: url};
          score[strategy + 'Score'] = data.score;
          return score;
        });
      })
    );

  }).then(function (results) {

    console.log('saving score results...');

    save(results);

    return results;

  }).then(function (results) {

    console.log('sending results by email...');

    var timeCount = (new Date().getTime() - timerStart)/1000;

    var data = {
      timestamp: moment().format(),
      timer: timeCount,
      results: results
    };

    return email('Page speed scores saved', data);

  }).finally(function () {

    console.log('Finished!');

  }).catch(function (error) {

    console.error('Error thrown: ' + error);

  });

};

// sets up cron job for getting & saving page speed scores
var job = new cronJob({
  cronTime: timeToRun,
  onTick: function () {
    return getScores();
  },
  start: false,
  timeZone: 'America/New_York'
});

// sync up models before starting app
models
  .sequelize
  .sync()
  .then(function () {
    console.log('starting cron job to get scores...');
    job.start();
  })
  .catch(function(error) {
    console.error('Database error: ' + error)
  });
