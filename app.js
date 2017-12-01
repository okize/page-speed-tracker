var path = require('path');
var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var assets = require('connect-assets');
var moment = require('moment');
var routes = require('./routes/index');
var apiRoutes = require('./routes/api');
var models = require('./models');
var assetPath = path.join(__dirname, 'public');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// make moment available in pug templates
app.locals.moment = moment

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use(assets());
// app.use(favicon(assetPath + '/favicon.ico'));
app.use(express.static(assetPath));

app.use('/', routes);
app.use('/api', apiRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
if (app.get('env') === 'development') {
  // development error handler
  // will print stacktrace
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
} else {
  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
}

app.set('port', process.env['PORT'] || 8000);
app.set('name', 'Page Speed Tracker');

models
  .sequelize
  .sync()
  .then(function () {
    var server = app.listen(app.get('port'), function() {
      console.log(app.get('name') + ' server listening on port ' + server.address().port);
    });
  })
  .catch(function(error) {
    console.error('Database error: ' + error)
  });

module.exports = app;
