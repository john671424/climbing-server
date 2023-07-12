var express = require('express');
var security_plus= require('../../../../security_plus');
var router = express.Router();
// {
//     "uID":,
//     "track_name":,
//     "start":,
//     "finish":,
//     "total_distance":,
//     "track_type":
// }
let insert_track=(db,req)=>{
  return new Promise((resolve, reject) => {
    let sql="INSERT INTO `track`(`uID`, `track_name`, `start`, `finish`, `total_distance`,`track_type`) VALUES (?,?,?,?,?,?)";
    let param=[req.body.uID, req.body.track_name, req.body.start, req.body.finish, req.body.total_distance, req.body.track_type];
    db.query(sql,param,(err,result,fields)=>{
      if(err){
        reject(err);
      }else{
        resolve(result);
      }
    })
  });
}
let select_track=(db,req,tID)=>{
  return new Promise((resolve, reject) => {
    let sql="SELECT * FROM `track` WHERE `tID`=?";
    let param=[tID];
    db.query(sql,param,(err,result,fields)=>{
      if(err){
        reject(err);
      }else{
        if(result.length!=1){
          reject("error");
        }else{
          resolve(result);
        }
      }
    })
  });
}
router.post('/',security_plus,async function(req, res, next) {
  try{
    let insert_track_results=await insert_track(req.db,req);
    let select_track_results=await select_track(req.db,req,insert_track_results.insertId);
    res.json(select_track_results[0]);
  }catch (error) {
    res.json({"result" : "Fail to add track"});
    console.log(error);
  }
});

module.exports = router;

