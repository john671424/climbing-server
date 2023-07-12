var express = require('express');
var security = require('../security');
var router = express.Router();
router.get('/',async function (req, res, next) {
  try {
    res.render('index', { title: 'OK' });
  } catch (error) {
    res.render('error', { title: 'Error' });
  }
});

module.exports = router;
