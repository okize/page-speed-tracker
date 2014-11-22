var _ = require('lodash');
var Promise = require('bluebird');
var models = require('../models');

var getUrls = Promise.method(function() {
  return models.Url.findAll().then( function(urls) {
    return _.pluck(urls, 'url');
  });
});

module.exports = getUrls;
