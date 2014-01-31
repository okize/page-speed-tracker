var fs = require('fs');
var http = require('http');

var jsonify = function(data) {
  return JSON.stringify(data, null, 2);
};

// send score results to a server
var sendResults = function (results, filename) {

  fs.readFile('./data/pageSpeedScores_20140116.json', 'utf8', function (err, data) {

    if (err) throw err;

    var options = {
      host: process.env.SAVE_JSON_ENDPOINT,
      port: 80,
      path: '/',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    var req = http.request(options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        console.log('body: ' + chunk);
      });
    });

    req.write(data);
    req.end();

  });

};

module.exports = sendResults;