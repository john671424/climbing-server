var express = require('express');
var router = express.Router();
//必須先通過check_friend 才不會自己加自己好友或是加已經是好友的
// {
//     "uID1":,
//     "uID2":
// }
let insert_friend=(db, req, uID1, uID2)=>{
  return new Promise((resolve, reject) => {
    let sql="INSERT INTO `friend`(`uID1`,`uID2`,`status`) VALUES (?,?,?)";
    let param=[uID1, uID2,1];//1代表尚未接受邀請 uID1 invite uID2 
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
        let results=await insert_friend(req.db,req,req.body.uID1,req.body.uID2);
        res.json({"result" : "Invite success"});
      }else{
        res.json({"result" : "You are my friend"});
      }
    }else{
      req.session.destroy();
      res.json({"result" : "Session fail"});
    }
  }catch (error) {
    res.json({"result" : "Fail to invite friend"});
    console.log(error);
  }
});

module.exports = router;

