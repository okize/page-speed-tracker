// modules
var Sequelize = require('sequelize');
var _ = require('lodash');

var sequelize = new Sequelize(process.env['DATABASE_URL'], {dialect: 'postgres'});

var getUrls = function() {

  var query = 'select * from "Urls"';

  return sequelize.query(query).then(function(results) {
    return _.pluck(results, 'url');
  });

};

module.exports = getUrls;
