var express = require('express');
var router = express.Router();
// {
//     "uID1":"1",//本人
//     "uID2":"2"//欲加好友
// }
let select_friend=(db,req)=>{
  return new Promise((resolve, reject) => {
    let sql="SELECT * FROM `friend` WHERE `uID1`=? AND `uID2`=?";
    let param=[req.body.uID1,req.body.uID2];
    db.query(sql,param,(err,result,fields)=>{
      if(err){
        reject(err);
      }else{
        if(result.length==0){
          resolve(result);
        }else{
          reject("already friend");
        }
      }
    })
  });
}
let select_member=(db,req)=>{
  return new Promise((resolve, reject) => {
    let sql="SELECT * FROM `member` WHERE `uID`=?";
    let param=[req.body.uID1];
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
let select_member_friend=(db,req)=>{
  return new Promise((resolve, reject) => {
    let sql="SELECT * FROM `member` WHERE `uID`=?";
    let param=[req.body.uID2];
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
router.post('/',async function(req, res, next) {
  try{
    let member_results=await select_member(req.db,req);
    if(req.session.account && member_results[0].account==req.session.account){
      if(req.body.uID1 != req.body.uID2){
        let results=await select_friend(req.db,req);
        let friend_results=await select_member_friend(req.db,req);
        req.socket.io.on("connection", (socket) => {
          req.socket.io.in(member_results[0].account).emit("account", "hello "+member_results[0].account+" account: "+friend_results[0].account+" send friend request to you");
        });
        res.json({"result" : "Send friend request"});
      }else{
        console.log("you are my friend");
        res.json({"result" : "You are my friend"});
      }
    }else{
      req.session.destroy();
      res.json({"result" : "Session fail"});
    }
  }catch (error) {
    console.log(error);
    res.json({"result" : "Already friend"});
  }
});

module.exports = router;

