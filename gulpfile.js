var path = require('path');
var dotenv = require('dotenv').load();
var gulp = require('gulp');
var taskListing = require('gulp-task-listing');
var nodemon = require('gulp-nodemon');
var gutil = require('gulp-util');
var prettyHrtime = require('pretty-hrtime');

// DO NOT restart node app when files change in these directories
var appIgnoreDirs = [
  'node_modules/',
  'gulp',
  'assets',
  'public/'
]

var startTime = void 0;

// logger
var log = {
  info: function(msg) {
    return gutil.log(gutil.colors.blue(msg));
  },
  error: function(err) {
    if (err.name && err.stack) {
      err = gutil.colors.red("" + err.plugin + ": " + err.name + ": ") + gutil.colors.bold.red("" + err.message) + ("\n" + err.stack);
    } else {
      err = gutil.colors.red(err);
    }
    return gutil.log(err);
  },
  start: function(msg) {
    startTime = process.hrtime();
    return gutil.log(gutil.colors.blue(msg));
  },
  end: function(task) {
    var taskTime;
    taskTime = prettyHrtime(process.hrtime(startTime));
    return gutil.log('Finished', gutil.colors.cyan(task), 'after', gutil.colors.magenta(taskTime));
  }
};

// start up application
gulp.task('start', function() {
  log.info('Starting application server');
  return nodemon({
    script: 'app.js',
    env: process.env,
    ignore: appIgnoreDirs
  }).on('restart', function(files) {
    log.info('Application restarted');
  }).on('quit', function() {
    return log.info('Application closed');
  });
});

// list tasks
gulp.task('help', taskListing);

// default task
gulp.task('default', ['start']);
