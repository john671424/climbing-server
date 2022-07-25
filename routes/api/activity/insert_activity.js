var express = require('express');
var router = express.Router();
//須提交創辦者uID activity_name activity_time tID warning_distance warning_time\
//及參與人員
// {
//     "uID":"1",
//     "activity_name":"john1",
//     "activity_time":"john1",
//     "tID":"1",
//     "warning_distance":"50",
//     "warning_time":"15",
//     "members":[2,3]
// }
//新增活動時 路線是提交tID嗎  //新增活動時UID提交 所有成員的uID如何提交?
let insert_activity=(db,req)=>{
  return new Promise((resolve, reject) => {
    let sql="INSERT INTO `activity`(`uID`, `activity_name`, `activity_time`, `tID`, `warning_distance`, `warning_time`) VALUES (?,?,?,?,?,?)";
    let param=[req.body.uID, req.body.activity_name, req.body.activity_time, req.body.tID, req.body.warning_distance, req.body.warning_time];
    db.query(sql,param,(err,result,fields)=>{
      if(err){
        reject(err);
      }else{
        resolve(result);
      }
    })
  });
}
let insert_activity_member=(db,req,results)=>{
    return new Promise((resolve, reject) => {
      req.body.members.forEach(element => {
        let sql="INSERT INTO `activity_member`(`aID`,`uID`) VALUES (?,?)";
        let param=[results.insertId,element];
        db.query(sql,param,(err,result,fields)=>{
          if(err){
            reject(err);
          }else{
            resolve(result);
          }
        })
        console.log("remind"+element);//socket or email
      });
      let sql="INSERT INTO `activity_member`(`aID`,`uID`) VALUES (?,?)";
      let param=[results.insertId,req.body.uID];
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
    let results=await insert_activity(req.db,req);
    let results_insert=await insert_activity_member(req.db,req,results);
    console.log("insert success");
    res.send("insert success");
  }catch (error) {
    console.log(error);
  }
});

module.exports = router;

