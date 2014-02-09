// modules
var Sequelize = require('sequelize');

var sequelize = new Sequelize(process.env['DATABASE_URL'], {
  dialect: 'postgres'
});

var getUrls = function (results, filename) {

  return sequelize.query('SELECT * FROM "Urls"');

};

module.exports = getUrls;