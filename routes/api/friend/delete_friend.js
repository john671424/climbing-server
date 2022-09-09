var express = require('express');
var router = express.Router();
// {
//     "uID1":,
//     "uID2":
// }
let delete_friend=(db, req, uID1, uID2)=>{
  return new Promise((resolve, reject) => {
    let sql="DELETE FROM `friend` WHERE `uID1`=? AND `uID2`=?";
    let param=[uID1, uID2];
    db.query(sql,param,(err,result,fields)=>{
      if(err){
        reject(err);
      }else{
        resolve(result);
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
        let results=await delete_friend(req.db,req,req.body.uID1,req.body.uID2);
        let results2=await delete_friend(req.db,req,req.body.uID2,req.body.uID1);
        let friend_results=await select_member_friend(req.db,req);
        req.socket.io.on("connection", (socket) => {
          req.socket.io.in(member_results[0].account).emit("account", "hello "+member_results[0].account+" account: "+friend_results[0].account+" delete you");
        });
        res.json({"result" : "Delete success"});
      }else{
        res.json({"result" : "You are my friend"});
      }
    }else{
      req.session.destroy();
      res.json({"result" : "Session fail"});
    }
  }catch (error) {
    res.json({"result" : "Fail to delete friend"});
    console.log(error);
  }
});

module.exports = router;

