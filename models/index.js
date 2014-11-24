var fs = require('fs');
var path  = require('path');
var pg = require('pg-native');
var Sequelize = require('sequelize');
var parse = require('pg-connection-string').parse;

// convert postgres connection string into object
var conn = parse(process.env['DATABASE_URL']);

// init sequlize connection
var sequelize = new Sequelize(conn.database, conn.user, conn.password, {
  dialect: 'postgres',
  protocol: 'postgres',
  port: conn.port,
  host: conn.host,
  native: true,
  logging: console.log
});

var db = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
