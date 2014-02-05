var path = require('path');
var fs = require('fs');
var cronJob = require('cron').CronJob;
var time = require('time');

//
var email = require(path.join(__dirname, 'lib', 'sendEmail.js'));

// urls to retreive page speed scores for
// var urls = require(path.join(__dirname, 'lib', 'urls.json'));

// sets up cron job for getting & saving page speed scores
var job = new cronJob({
  cronTime: '36 20 * * *',
  // cronTime: '0 8 * * *',
  // cronTime: process.env['CRON_TIME'],
  onTick: function () {
    return getScores();
  },
  start: true,
  timeZone: 'America/New_York'
});

function getScores () {
  var data = require(path.join(__dirname, 'lib', 'temp_example.json'));
  email('Page speed scores saved', data);
}