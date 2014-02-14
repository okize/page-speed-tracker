var fs = require('fs');
var http = require('http');

var jsonify = function(data) {
  return JSON.stringify(data, null, 2);
};

// send score results to a server
var sendResults = function (results) {

  var data = jsonify(results);

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

  var req = http.request(options, function (res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log(chunk);
    });
  });

  req.write(data);
  req.on('error', function (err) {
    throw err;
  });
  req.end();

};

module.exports = sendResults;