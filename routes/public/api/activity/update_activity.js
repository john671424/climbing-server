var express = require('express');
var security= require('../../../../security');
var router = express.Router();
// {
//     "aID":""
//     "uID":"1",
//     "activity_name":"john1",
//     "tID":"1",
//     "warning_distance":"50",
//     "warning_time":"15",

// }
//新增活動時 提醒更新activty //要傳送aID給client
let update_activity=(db,req)=>{
  return new Promise((resolve, reject) => {
    let sql="UPDATE `activity` SET `uID`=?,`activity_name`=?,`activity_time`=?,`tID`=?,`warning_distance`=?,`warning_time`=? where `aID`=?";
    let param=[ req.body.uID,req.body.activity_name,req.body.activity_time, req.body.tID, req.body.warning_distance, req.body.warning_time,req.body.aID];
    db.query(sql,param,(err,result,fields)=>{
      if(err){
        reject(err);
      }else{
        resolve(result);
      }
    })
  });
}

let select_update_activity=(db,aID)=>{
  return new Promise((resolve, reject) => {
    let sql="SELECT * FROM `activity` WHERE `aID`=?";
    let param=[aID];
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
    let update_activity_results=await update_activity(req.db,req);
    let select_update_activity_results=await select_update_activity(req.db,req.body.aID)
    res.json(select_update_activity_results[0]);
  }catch (error) {
    res.json({"result" : "Fail to update activity"});
    console.log(error);
  }
});

module.exports = router;

