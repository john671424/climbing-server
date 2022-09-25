const { log } = require('debug/src/browser');
var express = require('express');
var router = express.Router();
const path = require('path');
const folderPath = path.resolve('./')+"/files/Puli";
router.get('/',async function (req, res, next) {
  try {
    console.log('single file');
    console.log(folderPath);
    // Download function provided by express
    res.download(folderPath+"/"+req.query.z+"/"+req.query.x+"/"+req.query.y+".png", function(err) {
        if(err) {
            console.log(err);
        }
    })
  } catch (error) {
    console.log("login failed");
    res.send("login failed");
    console.log(error);
  }

});

module.exports = router;
