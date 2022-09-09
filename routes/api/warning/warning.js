var express = require('express');
var router = express.Router();
// {
//     "aID":"1",
// }
//以到 server 時間為主
let start_activity=(db,req)=>{
  return new Promise((resolve, reject) => {
    let sql="UPDATE `activity` SET `activity_time`=? WHERE `aID`=?";
    let param=[Date.now(),req.body.aID];
    db.query(sql,param,(err,result,fields)=>{
      if(err){
        reject(err);
      }else{
        resolve(result);
      }
    })
  });
}
let select_activity=(db,req)=>{
    return new Promise((resolve, reject) => {
      let sql="SELECT * FROM `activity` WHERE `aID`=?";
      let param=[req.body.aID];
      db.query(sql,param,(err,result,fields)=>{
        if(err){
          reject(err);
        }else{
          resolve(result);
        }
      })
    });
  }
router.post('/',async function(req, res, next) {
  try{
    if(req.session.account){
      let results=await start_activity(req.db,req);
      console.log("update success");
      let results_select=await select_activity(req.db,req);
      console.log(results_select[0]);
      res.send("update success");
    }else{
      req.session.destroy();
      res.json({"result" : "Session fail"});
    }
  }catch (error) {
    console.log(error);
  }
});

module.exports = router;

