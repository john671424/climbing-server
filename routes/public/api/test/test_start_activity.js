const { log } = require('debug/src/browser');
var express = require('express');
var router = express.Router();
// {
//     "aID":"1",
// }
//以到 server 時間為主
let start_activity=(db,req)=>{
  return new Promise((resolve, reject) => {
    let sql="UPDATE `activity` SET `start_activity_time`=? WHERE `aID`=?";
    let param=[new Date().toISOString().slice(0, 19).replace('T', ' '),req.query.aid];
    console.log(new Date().toISOString().slice(0, 19).replace('T', ' '));
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
      let param=[req.query.aid];
      db.query(sql,param,(err,result,fields)=>{
        if(err){
          reject(err);
        }else{
          resolve(result);
        }
      })
    });activity_member
  }
let select_insert_activity_member=(db,req,select_activity_member_results,select_activity_results)=>{
  return new Promise((resolve, reject) => {
    select_activity_member_results.forEach(element => {
      let sql="SELECT * FROM `member` WHERE `uID`=?";
      let param=[element.uID];
      db.query(sql,param,(err,result,fields)=>{
        if(err){
          reject(err);
        }else{
          req.socket.io.to(result[0].account).emit("account",`user {${result[0].account}} , activity {${select_activity_results[0].activity_name}} is start. Please join socket room`,"join socekt room",result[0].account,select_activity_results[0].aID+" "+select_activity_results[0].activity_name);
          resolve(result);
        }
      })
      //socket or email
    });
  });
}
let select_activity_member=(db,req,select_activity_results)=>{
  return new Promise((resolve, reject) => {
      let sql="SELECT * FROM `activity_member` WHERE `aID`=?";
      let param=[req.query.aid];
      db.query(sql,param,(err,result,fields)=>{
        if(err){
          reject(err);
        }else{
          resolve(result);
        }
      })
  });
}
let name;
let counter=1;
router.post('/',async function(req, res, next) {
  try{
    if(req.session.account){
      name=req.session.account;
      console.log("session ok");
      req.socket.io.on("connection", (socket) => {
        if (name==req.session.account && counter==1) {
          console.log("通過驗證");
          socket.on("ctlmsg", (ctlmsg,account_msg,activity_msg) => {
            if(ctlmsg){console.log("ctlcontrolmsg: "+ctlmsg);}
            if(account_msg){console.log("ctlaccount_msg: "+account_msg);} 
            if(activity_msg){console.log("activity_msg: "+activity_msg);}
            if(ctlmsg && ctlmsg=="join socket room")
            socket.join(activity_msg);
            counter--;
          });
        }
      });
      let update_activity_results=await start_activity(req.db,req);
      let select_activity_results=await select_activity(req.db,req);
      let select_activity_member_results=await select_activity_member(req.db,req);
      console.log(select_activity_member_results);
      await select_insert_activity_member(req.db,req,select_activity_member_results,select_activity_results);
      name=req.session.account;
      
      res.render('index', { title: req.session.account + "test"});
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

