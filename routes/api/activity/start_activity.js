const { log } = require('debug/src/browser');
var express = require('express');
var router = express.Router();
// {
//     "aID":"1",
// }
//以到 server 時間為主
let start_activity=(db,req)=>{
  return new Promise((resolve, reject) => {
    var datetime=new Date(+new Date+8*3600*1000);
    let sql="UPDATE `activity` SET `start_activity_time`=? WHERE `aID`=?";
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
    });activity_member
  }
let select_insert_activity_member=async(db,req,select_activity_member_results,select_activity_results)=>{
  const sockets = await req.socket.io.fetchSockets();
  return new Promise((resolve, reject) => {
    select_activity_member_results.forEach(element => {
      let sql="SELECT * FROM `member` WHERE `uID`=?";
      let param=[element.uID];
      db.query(sql,param,(err,result,fields)=>{
        if(err){
          reject(err);
        }else{
          for (const socket of sockets) {
            if(socket.handshake.auth.account==result[0].account){
              req.socket.io.in(socket.id).socketsJoin(select_activity_results[0].aID+" "+select_activity_results[0].activity_name);
            }
          }
          req.socket.io.to(result[0].account).emit("account",
          {
            "ctlmsg":"activity start", 
            "activity_msg":select_activity_results[0].aID+" "+select_activity_results[0].activity_name
        });
          resolve(result);
        }
      })
    });
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
let update_activity_member=(db,req)=>{
  return new Promise((resolve, reject) => {
      let sql="UPDATE `activity_member` SET `status`=1 WHERE `aID`=?";
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
      let update_activity_results=await start_activity(req.db,req);
      let select_activity_results=await select_activity(req.db,req);
      let select_activity_member_results=await select_activity_member(req.db,req);
      let update_activity_member_results=await update_activity_member(req.db,req);
      await select_insert_activity_member(req.db,req,select_activity_member_results,select_activity_results);
      res.json(select_activity_results[0])
    }else{
      req.session.destroy();
      res.json({"result" : "session fail"});
    }
  }catch (error) {
    res.json({"result" : "Fail to start a activity"});
    console.log(error);
  }
});

module.exports = router;

