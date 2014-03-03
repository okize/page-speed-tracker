// for converting json into postgres table inserts
// this is *really* shitty code

var fs = require('fs');
var pg = require('pg');
var data = fs.readdirSync('../data');
var scores;
var convertedRows = [];

var convert = function(obj, timestamp) {

  var strategy = '';
  if (obj.hasOwnProperty('desktopScore')) {
    strategy = 'desktop';
  } else {
    strategy = 'mobile';
  }

  return {
    url: obj.url,
    strategy: strategy,
    score: obj[strategy + 'Score'],
    createdAt: timestamp,
    updatedAt: timestamp
  };

};

// read all the files in data directory
data.forEach(function(file) {

  scores = JSON.parse(fs.readFileSync('../data/' + file, 'utf8'));

  scores.results.forEach(function(rows, i) {
    rows.forEach( function(row) {
      convertedRows.push(convert(row, scores.timestamp));
    });
  });

});

pg.connect(process.env['DATABASE_URL'], function(err, client, done) {

  console.log('starting inserts...');

  convertedRows.forEach(function(row, i) {

    client.query(
      'INSERT into "Scores" (url, strategy, score, "createdAt", "updatedAt") VALUES($1, $2, $3, $4, $5) RETURNING id',
      [row.url, row.strategy, row.score, row.updatedAt, row.createdAt],
      function(err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log('row inserted with id: ' + result.rows[0].id);
        }

        if (i === (convertedRows.length - 1)) {
          client.end();
          console.log('finished inserts!');
        }

      });
  });

});