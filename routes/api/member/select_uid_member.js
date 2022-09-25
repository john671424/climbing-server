var express = require('express');
var router = express.Router();
// {
//     "uID":"9"
// }
//以到 server 時間為主
  let select_member=(db,req)=>{
    return new Promise((resolve, reject) => {
      let sql="SELECT `account`,`name` FROM `member` WHERE `uID`=?";
      let param=[req.body.uID];
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
    if(req.session.account){
      let select_update_member_results=await select_member(req.db,req);
      res.json(select_update_member_results[0]);
    }else{
      req.session.destroy();
      res.json({"result" : "session fail"});
    }
  }catch (error) {
    res.json({"result" : "Fail to select uid in member table"});
    console.log(error);
  }
});

module.exports = router;

