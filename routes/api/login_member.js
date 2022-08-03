var express = require('express');
var router = express.Router();
let select_account=(db,req)=>{
  return new Promise((resolve, reject) => {
    let sql="SELECT * FROM `member` WHERE `account`=? AND `password`=?";
    let param=[req.body.account,req.body.password];
    db.query(sql,param,(err,result,fields)=>{
      if(err){
        reject(err);
      }else{
        if(result.length!=1){
          reject("no result");
        }else{
          req.session.account=result[0].account;
          resolve(result);
        }
      }
    })
  });
}
router.post('/',async function(req, res, next) {
  try{
    let results=await select_account(req.db,req);
    console.log("login success");
    console.log("session:"+req.session);
    console.log("sessionID:"+req.sessionID);
    if(req.session.account!=""){
      res.send("Welcome "+req.session.account);
    }else{
      res.send("login success");
    }
    console.log(results[0]);
    
  } catch (error) {
    console.log("login failed");
    res.send("login failed");
    console.log(error);
  }
});

module.exports = router;

