var express = require('express');
var router = express.Router();
let select_account=(db,req)=>{
    return new Promise((resolve, reject) => {
      let sql="SELECT * FROM `member` WHERE `account`=? AND `password`=?";
      let param=[req.query.account,req.query.password];
      db.query(sql,param,(err,result,fields)=>{
        if(err){
          reject(err);
        }else{
          if(result.length!=1){
            reject("no result");
          }else{
            console.log("success");
            req.session.account=result[0].account;
            console.log("success session:"+req.session.account);
            resolve(result);
          }
        }
      })
    });
  }
router.get('/',async function (req, res, next) {
  try {
    console.log(req.session);
    // console.log(req.session.account);
    console.log("sessionID:"+req.sessionID);
    console.log("try");
    if(req.session.account){
      res.send("Welcome "+req.session.account);
      console.log("login success");
    //   req.session.destroy();
    }else{
      let results=await select_account(req.db,req);
      res.send("error");
    }
  } catch (error) {
    console.log("login failed");
    res.send("login failed");
    console.log(error);
  }

});

module.exports = router;
