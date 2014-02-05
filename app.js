var path = require('path');
var fs = require('fs');
var cronJob = require('cron').CronJob;
var time = require('time');

//
var email = require(path.join(__dirname, 'lib', 'sendEmail.js'));

// urls to retreive page speed scores for
// var urls = require(path.join(__dirname, 'lib', 'urls.json'));

//
var job = new cronJob({
  cronTime: '49 18 * * *',
  // cronTime: process.env['CRON_TIME'],
  onTick: function() {

    fs.readFile('./test.html', function (err, data) {
      if (err) throw err;
      email('email sent', data);
    });

  },
  start: false,
  timeZone: 'America/New_York'
});

job.start();