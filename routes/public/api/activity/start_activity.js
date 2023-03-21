const { log } = require('debug/src/browser');
var express = require('express');
var router = express.Router();
// {
//     "aID":"1",
// }
//以到 server 時間為主
let start_activity=(db,req)=>{
  return new Promise((resolve, reject) => {
    var datetime=new Date(+new Date+8*3600*1000);
    let sql="UPDATE `activity` SET `start_activity_time`=? WHERE `aID`=?";
    let param=[new Date(datetime).toISOString().slice(0, 19).replace('T', ' '),req.body.aID];
    db.query(sql,param,(err,result,fields)=>{
      if(err){
        reject(err);
      }else{
        if(result.affectedRows!=1){
          reject("no result");
        }else{
          resolve(result);
        }
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
    });activity_member
  }

router.post('/',async function(req, res, next) {
  try{
    if(req.session.account){
      let update_activity_results=await start_activity(req.db,req);
      let select_activity_results=await select_activity(req.db,req);
      res.json(select_activity_results[0])
    }else{
      req.session.destroy();
      res.json({"result" : "session fail"});
    }
  }catch (error) {
    res.json({"result" : "Fail to start a activity"});
    console.log(error);
  }
});

module.exports = router;

