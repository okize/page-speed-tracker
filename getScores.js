// modules
var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var querystring = require('querystring');

// google page speed insights api request url
var reqUrl = 'https://www.googleapis.com/pagespeedonline/v1/runPagespeed?';

// url = url of page to get page speed score for
// strategy = desktop or mobile
// key = page speed insights API key
var getScore = function (url, strategy, key) {
  var config = {
    url: url,
    strategy: strategy,
    key: key,
    fields: 'score'
  };
  return request(reqUrl + querystring.stringify(config));
};

module.exports = getScore;