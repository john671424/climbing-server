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
        if(result.length!=0){
          reject("no result");
        }else{
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
    res.send("login success");
    console.log(results[0]);
    
  } catch (error) {
    console.log("login failed");
    res.send("login failed");
    console.log(error);
  }
});

module.exports = router;

