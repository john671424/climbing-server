var express = require('express');
var security_plus= require('../../../../security_plus');
var router = express.Router();
// {
//     "uID":"9"
//     "tID":"1",
//     "track_name":"l"
// }
let update_track=(db,req)=>{
  return new Promise((resolve, reject) => {
    let sql="UPDATE `track` SET `track_name`=? WHERE `tID`=?";
    let param=[req.body.track_name,req.body.tID];
    db.query(sql,param,(err,result,fields)=>{
      if(err){
        reject(err);
      }else{
        resolve(result);
      }
    })
  });
}
let select_track=(db,req)=>{
  return new Promise((resolve, reject) => {
    let sql="SELECT * FROM `track` WHERE `tID`=?";
    let param=[req.body.tID];
    db.query(sql,param,(err,result,fields)=>{
      if(err){
        reject(err);
      }else{
        resolve(result);
      }
    })
  });
}

router.post('/',security_plus,async function(req, res, next) {
  try{
    let update_track_results=await update_track(req.db,req);
    let select_track_results=await select_track(req.db,req);
    res.json(select_track_results[0]);
  }catch (error) {
    res.json({"result" : "Fail to edit a track"});
    console.log(error);
  }
});

module.exports = router;

