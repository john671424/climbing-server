var express = require('express');
var security_plus= require('../../../../security_plus');
var router = express.Router();
// {
//     "uID":"9"
// }
//以到 server 時間為主
let update_member=(db,total_distance,total_time,uID,old_distance,old_time)=>{
    return new Promise((resolve, reject) => {
      let sql="UPDATE `member` SET `total_distance`=?,`total_time`=? WHERE `uID`=?";
      let param=[Number(old_distance)+Number(total_distance),Number(old_time)+Number(total_time),uID];
      db.query(sql,param,(err,result,fields)=>{
        if(err){
          reject(err);
        }else{
          resolve(result);
        }
      })
    });
  }
  let select_member=(db,uID)=>{
    return new Promise((resolve, reject) => {
      let sql="SELECT `uID`, `account`,`name`, `total_distance`, `total_time`, `total_activity`, `total_track` FROM `member` WHERE `uID`=?";
      let param=[uID];
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
    let member_results=await select_member(req.db,req.body.uID);
    let update_member_results=await update_member(req.db,req.body.total_distance,req.body.total_time,req.body.uID,member_results[0].total_distance,member_results[0].total_time);
    let select_update_member_results=await select_member(req.db,req.body.uID);
    res.json(select_update_member_results[0]);
  }catch (error) {
    res.json({"result" : "Fail to update total_distance and total_time in member table"});
    console.log(error);
  }
});

module.exports = router;

