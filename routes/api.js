var router = require('express').Router();
var moment = require('moment');
var _ = require('lodash');
var models = require('../models');

router
  .route('/score')
  .get(function (req, res) {
    res
      .status(200)
      .send('needs url id');
  });

module.exports = router;
