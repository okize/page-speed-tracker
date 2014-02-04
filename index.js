var path = require('path'),
    cronJob = require('cron').CronJob,
    time = require('time');

var email = require('./sendEmail.js');

var job = new cronJob({
  cronTime: '0 8 * * *',
  onTick: function() {
    email('email sent', 'email body');
  },
  start: false,
  timeZone: "America/New_York"
});

job.start();