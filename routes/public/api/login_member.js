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
    if(req.session.account){
      res.json(results[0]);
    }else{
      req.session.destroy();
      res.status(405).json({"result" : "Login fail"});
    }
  } catch (error) {
    req.session.destroy();
    res.status(405).json({"result" : "Login fail"});
    console.log(error);
  }
});
module.exports = router;

