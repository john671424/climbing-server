var express = require('express');
var router = express.Router();
router.get('/',async function (req, res, next) {
  try {
    res.render('upload', { title: 'Upload' });
  } catch (error) {
    console.log("login failed");
    res.send("login failed");
    console.log(error);
  }
});
router.post("/", (req, res) => {
  if (!req.files) {
    return res.status(400).send("No files were uploaded.");
  }
  const file = req.files.myFile;
  const path = "C:\\project\\files\\"+file.name;
  file.mv(path, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.send({ status: "success", path: path });
  });
});
module.exports = router;
