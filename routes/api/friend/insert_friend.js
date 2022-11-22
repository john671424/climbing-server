var express = require('express');
var router = express.Router();
//必須先通過check_friend 才不會自己加自己好友或是加已經是好友的
// {
//     "uID1":,
//     "friend":
// }
let insert_friend=(db, req, uID1, uID2)=>{
  return new Promise((resolve, reject) => {
    let sql="INSERT INTO `friend`( `uID1`, `uID2`) VALUES ((SELECT `uID` from `member` where `account`=?),?)";
    let param=[req.body.friend,req.body.uID1];
    db.query(sql,param,(err,result,fields)=>{
      if(err){
        reject(err);
      }else{
        resolve(result);
      }
    })
  });
}
let update_friend=(db, req, uID1, uID2)=>{
  return new Promise((resolve, reject) => {
    let sql="UPDATE `friend` SET `status`=0 where `uID1`=? and `uID2`=(SELECT `uID` from `member` where `account`=?)";
    let param=[uID1, req.body.friend];
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
router.post('/',async function(req, res, next) {
  try{
    let member_results=await select_member(req.db,req);
    if(req.session.account && member_results[0].account==req.session.account){
      if(req.body.uID1 != req.body.uID2){
        let results=await update_friend(req.db,req,req.body.uID1,req.body.uID2);
        let results2=await insert_friend(req.db,req,req.body.uID2,req.body.uID1);
        res.json({"result" : "Insert success"});
      }else{
        res.json({"result" : "You are my friend"});
      }
    }else{
      req.session.destroy();
      res.json({"result" : "Session fail"});
    }
  }catch (error) {
    res.json({"result" : "Fail to insert friend"});
    console.log(error);
  }
});

module.exports = router;

