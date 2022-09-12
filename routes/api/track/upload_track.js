var express = require('express');
var router = express.Router();
// {
//     "uID":"1",
// }
let update_track_locate=(db,req)=>{
  return new Promise((resolve, reject) => {
    let sql="UPDATE `track` SET `track_locate`=? WHERE `tID`=?";
    let param=["john?",req.body.tID];
    db.query(sql,param,(err,result,fields)=>{
      if(err){
        reject(err);
      }else{
        resolve(result);
      }
    })
  });
}
router.post('/',async function(req, res, next) {
  try{
    if(req.session.account){
      if (!req.files) {
        return res.status(400).send("No files were uploaded.");
      }
      const file = req.files.myFile;
      const path = "C:\\project\\files\\"+file.name;
      await file.mv(path,(err) => {
        if (err) {
          return res.status(500).send(err);
        }
        let update_track_locate_results=update_track_locate(req.db,req);
        return res.send({ status: "success", path: path });
      });
    }else{
      req.session.destroy();
      res.json({"result" : "Session fail"});
    }
  }catch (error) {
    res.json({"result" : "Fail to upload track"});
    console.log(error);
  }
});

module.exports = router;

