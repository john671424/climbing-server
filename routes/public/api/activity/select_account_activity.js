var express = require('express');
var router = express.Router();
// {
//     "uID":"1",
// }
let select_activity=(db,req)=>{
    return new Promise((resolve, reject) => {
      //let sql="SELECT * FROM `activity` WHERE `aID` in (SELECT `aID` FROM `activity_member` WHERE `uID`=?)";
      let sql="SELECT activity.`aID`, activity.`uID`, activity.`activity_name`, activity.`start_activity_time`, activity.`finish_activity_time`, activity.`activity_time`, activity.`tID`, activity.`warning_distance`, activity.`warning_time` ,GROUP_CONCAT(activity_member.`uID`)AS members FROM `activity` left JOIN `activity_member`ON activity_member.aID=activity.aID WHERE `activity_member`.`aID` IN (SELECT `aID` FROM `activity_member` WHERE `uID`=?)GROUP BY activity_member.aID";
      let param=[req.body.uID];
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
      let select_activity_results=await select_activity(req.db,req);
      res.json(select_activity_results);
    }else{
      req.session.destroy();
      res.json({"result" : "Session fail"});
    }
  }catch (error) {
    res.json({"result" : "Fail to query the account activity"});
    console.log(error);
  }
});

module.exports = router;

