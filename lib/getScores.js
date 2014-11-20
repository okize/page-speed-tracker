var pg = require('pg');

pg.connect(process.env['DATABASE_URL'], function (err, client, done) {
  client.query('SELECT * FROM "Scores"', null, function (err, result) {
    done();
    return console.log(result.rows);
  });
});

pg.end();