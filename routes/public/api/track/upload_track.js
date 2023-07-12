var express = require('express');
var security= require('../../../../security');
var router = express.Router();
const path =require('path');
// {
//     "tID":"1"
// }
let update_track_locate=(db,req,locate)=>{
  return new Promise((resolve, reject) => {
    let sql="UPDATE `track` SET `track_locate`=? WHERE `tID`=?";
    let param=[locate,req.body.tID];
    db.query(sql,param,(err,result,fields)=>{
      if(err){
        reject(err);
      }else{
        resolve(result);
      }
    })
  });
}
router.post('/',security,async function(req, res, next) {
  try{
    if (!req.files) {
      return res.status(400).send("No files were uploaded.");
    }
    const file = req.files.files;
    const filepath = path.resolve('./')+"/files/tracks/"+file.name+Date.now();
    const locate = "tracks/"+file.name+Date.now();
    await file.mv(filepath,(err) => {
      if (err) {
        return res.status(500).send(err);
      }
      let update_track_locate_results=update_track_locate(req.db,req,locate);
      return res.send({ status: "success", path: filepath });
    });
  }catch (error) {
    res.json({"result" : "Fail to upload track"});
    console.log(error);
  }
});

module.exports = router;

