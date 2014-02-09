var connectionString = process.env['DATABASE_URL'];
var Sequelize = require('sequelize');
var sequelize = new Sequelize(connectionString, {
  dialect: 'postgres'
});

sequelize.query('SELECT * FROM "Urls"').success(function(rows) {
  var urls = [];
  for (var i = 0, len = rows.length; i < len; i++) {
    urls.push(rows[i].url);
  }
  console.log(urls);
});
