var express = require('express');
var security = require('../security');
var router = express.Router();
router.get('/',security,async function (req, res, next) {
  try {
    res.render('index', { title: 'Express1' });
  } catch (error) {
    res.render('index', { title: 'Error' });
  }
});

module.exports = router;
