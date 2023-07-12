var express = require('express');
var security= require('../../../../security');
var router = express.Router();
// {
//     "aID":"1",
// }
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
let update_finish_activity_time=(db,req)=>{
  return new Promise((resolve, reject) => {
    var datetime=new Date(+new Date+8*3600*1000);
    let sql="UPDATE `activity` SET `finish_activity_time`=? WHERE `aID`=?";
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
router.post('/',security,async function(req, res, next) {
  try{
    let update_finish_activity_time_results=await update_finish_activity_time(req.db,req);
    let select_activity_results=await select_activity(req.db,req);
    res.json(select_activity_results[0])
  }catch (error) {
    res.json({"result" : "Fail to finish a activity"});
    console.log(error);
  }
});
module.exports = router;

