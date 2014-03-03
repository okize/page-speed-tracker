// modules
var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var querystring = require('querystring');

// google page speed insights api request url
var reqUrl = 'https://www.googleapis.com/pagespeedonline/v1/runPagespeed?';

// google page speed insights api key
var apiKey = process.env['PAGESPEED_API_KEY'];

// url = url of page to get page speed score for
// strategy = desktop or mobile
// key = page speed insights API key
var getScore = function (url, strategy) {
  var config = {
    url: url,
    strategy: strategy,
    key: apiKey,
    fields: 'score'
  };
  return request(reqUrl + querystring.stringify(config));
};

module.exports = getScore;