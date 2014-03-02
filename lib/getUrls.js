// modules
var Sequelize = require('sequelize');

var sequelize = new Sequelize(process.env['DATABASE_URL'], {
  dialect: 'postgres'
});

var getUrls = function (results, filename) {

  return sequelize.query('select * from Urls;');

};

module.exports = getUrls;