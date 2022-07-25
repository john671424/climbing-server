var express = require('express');
var router = express.Router();
// {
//     "aID":"1",
// }
//以到 server 時間為主
let finish_activity=(db,req)=>{
  return new Promise((resolve, reject) => {
    let sql="UPDATE `activity` SET `activity_time`=? WHERE `aID`=?";
    let param=[new Date().toISOString().slice(0, 19).replace('T', ' '),req.body.aID];
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
    let results_select=await select_activity(req.db,req);
    let results=await finish_activity(req.db,req,results_select.activity_time);
    console.log("update success");
    console.log(results_select[0]);
    res.send("update success");
  }catch (error) {
    console.log(error);
  }
});

module.exports = router;

