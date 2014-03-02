// modules
var Promise = require('bluebird');
var path = require('path');
var fs = require('fs');
var moment = require('moment');
var cronJob = require('cron').CronJob;
var microtime = require('microtime');
var time = require('time');

var Sequelize = require('sequelize');
var sequelize = new Sequelize(process.env['DATABASE_URL'], {
  dialect: 'postgres'
});

// query db for list of urls to get scores for
var getUrls = function (results, filename) {

  return sequelize.query('select * from "Urls";');

};


// get all the pagespeed scores, save them & email them
var getScores = function () {

  console.log( moment().format() );

  getUrls().then(function(rows) {

    var urls = [];
    for (var i = 0, len = rows.length; i < len; i++) {
      urls.push(rows[i].url);
    }
    return urls;

  }).then(function(urls) {

    urls.forEach(function(url) {
      console.log(url);
    });

  }).catch(function (err) {

    console.error('Error thrown: ' + err);

  });

};

getScores();