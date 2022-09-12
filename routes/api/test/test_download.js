var express = require('express');
var router = express.Router();
const folderPath = "C:\\project\\files\\";
router.get('/',async function (req, res, next) {
  try {
    console.log('single file');
     
    // Download function provided by express
    res.download(folderPath+'/john.txt', function(err) {
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
