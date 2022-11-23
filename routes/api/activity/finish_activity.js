const { log } = require('debug/src/browser');
var express = require('express');
var router = express.Router();
// {
//     "aID":"1",
// }
//以到 server 時間為主
// let update_activity_time=(db,req,activity_time)=>{
//   return new Promise((resolve, reject) => {
//     let sql="UPDATE `activity` SET `activity_time`=? WHERE `aID`=?";
//     let param=[activity_time,req.body.aID];
//     db.query(sql,param,(err,result,fields)=>{
//       if(err){
//         reject(err);
//       }else{
//         resolve(result);
//       }
//     })
//   });
// }
// let select_activity_time=(db,start_time,finish_time)=>{
//   return new Promise((resolve, reject) => {
//     let sql="select timediff(?,?) as  time";
//     let param=[start_time,finish_time];
//     db.query(sql,param,(err,result,fields)=>{
//       if(err){
//         reject(err);
//       }else{
//         resolve(result);
//       }
//     })
//   });
// }
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
let update_finish_activity_time=(db,req)=>{
  return new Promise((resolve, reject) => {
    var datetime=new Date(+new Date+8*3600*1000);
    let sql="UPDATE `activity` SET `finish_activity_time`=? WHERE `aID`=?";
    let param=[new Date(datetime).toISOString().slice(0, 19).replace('T', ' '),req.body.aID];
    db.query(sql,param,(err,result,fields)=>{
      if(err){
        reject(err);
      }else{
        if(result.affectedRows!=1){
          reject("no result");
        }else{
          resolve(result);
        }
      }
    })
  });
}
let select_activity_member=(db,req)=>{
  return new Promise((resolve, reject) => {
      let sql="SELECT * FROM `activity_member` WHERE `aID`=?";
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
let select_uid=(db,uID)=>{
  return new Promise((resolve, reject) => {
      let sql="SELECT * FROM `member` WHERE `uID`=?";
      let param=[uID];
      db.query(sql,param,(err,result,fields)=>{
        if(err){
          reject(err);
        }else{
          resolve(result);
        }
      })
  });
}
let update_activity_member=(db,req)=>{
  return new Promise((resolve, reject) => {
      let sql="UPDATE `activity_member` SET `status`=0 where `aID`=?";
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
      let update_finish_activity_time_results=await update_finish_activity_time(req.db,req);
      let select_activity_results=await select_activity(req.db,req);
      //let select_activity_time_result=await select_activity_time(req.db,select_activity_results[0].start_activity_time,select_activity_results[0].finish_activity_time);
      //let update_activity_time_results=await update_activity_time(req.db,req);
      let select_activity_results_2=await select_activity(req.db,req);
      let select_activity_member_result =await select_activity_member(req.db,req);
      let update_activity_member_result =await update_activity_member(req.db,req);
      req.socket.io.socketsLeave(select_activity_results[0].aID+" "+select_activity_results[0].activity_name);
      select_activity_member_result.forEach(async element =>{
        let select_uid_result =await select_uid(req.db,element.uID);
        let select_activity_result =await select_activity(req.db,req);
        req.socket.io.to(select_uid_result[0].account).emit("account",{
          "ctlmsg":"activity finish",
          "activity_msg":select_activity_result[0].aID+" "+select_activity_result[0].activity_name,
          "account_msg":select_uid_result[0].account
        })
      });
      res.json(select_activity_results_2[0])
    }else{
      req.session.destroy();
      res.json({"result" : "Session fail"});
    }
  }catch (error) {
    res.json({"result" : "Fail to finish a activity"});
    console.log(error);
  }
});

module.exports = router;

