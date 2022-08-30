var express = require('express');
var router = express.Router();
// {
//     "aID":"1",
// }
//以到 server 時間為主
let finish_activity=(db,req,activity_time)=>{
  return new Promise((resolve, reject) => {
    let sql="UPDATE `activity` SET `activity_time`=? WHERE `aID`=?";
    let param=[activity_time,req.body.aID];
    db.query(sql,param,(err,result,fields)=>{
      if(err){
        reject(err);
      }else{
        resolve(result);
      }
    })
  });
}
let select_activity_time=(db,req,activity_time)=>{
  return new Promise((resolve, reject) => {
    let sql="select timediff(?,?)";
    let param=[activity_time,new Date().toISOString().slice(0, 19).replace('T', ' ')];
    db.query(sql,param,(err,result,fields)=>{
      if(err){
        reject(err);
      }else{
        resolve(result);
      }
    })
  });
}
let select_activity=(db,req)=>{
    return new Promise((resolve, reject) => {
      let sql="SELECT * FROM `activity` WHERE `aID`=?";
      let param=[req.body.aID];
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
      let results_select=await select_activity(req.db,req);
      console.log("time: "+results_select[0].activity_time);
      let time_result=await select_activity_time(req.db,req,req,results_select[0].activity_time);
      console.log(time_result);
      let results=await finish_activity(req.db,req,time_result[0]);
      console.log("update success");
      console.log(results_select[0]);
      res.send("update success");
    }else{
      req.session.destroy();
      res.send("session fail");
    }
  }catch (error) {
    console.log(error);
  }
});

module.exports = router;

