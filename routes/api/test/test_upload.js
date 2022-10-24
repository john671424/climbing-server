var express = require('express');
const multer  = require('multer')
var router = express.Router();
// const path = require('path');
// const folderPath = path.resolve('./')+"/files/tracks";
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, folderPath)
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname + '-' + Date.now())
//   }
// })
// const upload = multer({ storage: storage });
router.get('/',async function (req, res, next) {
  try {
    res.render('upload', { title: 'Upload' });
  } catch (error) {
    console.log("login failed");
    res.send("login failed");
    console.log(error);
  }
});
router.post("/"/*,upload.single('myFile')*/, (req, res) => {
  // if (!req.files) {
  //   return res.status(400).send("No files were uploaded.");
  // }
  // const file = req.files.myFile;
  // const path = "C:\\project\\files\\"+file.name;
  // file.mv(path, (err) => {
  //   if (err) {
  //     return res.status(500).send(err);
  //   }
  //   return res.send({ status: "success", path: path });
  // });
  res.send({ status: "success" });
});
module.exports = router;
// router.post("/",upload.single('myFile'), (req, res) => {
//   if (!req.files) {
//     return res.status(400).send("No files were uploaded.");
//   }
//   const file = req.files.myFile;
//   const path = "C:\\project\\files\\"+file.name;
//   file.mv(path, (err) => {
//     if (err) {
//       return res.status(500).send(err);
//     }
//     return res.send({ status: "success", path: path });
//   });
// });