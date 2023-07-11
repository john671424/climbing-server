var express = require('express');
var router = express.Router();
// {
//     "uID":"1",
// }
let select_activity=(db,req)=>{
    return new Promise((resolve, reject) => {
      //let sql="SELECT * FROM `activity` WHERE `aID` in (SELECT `aID` FROM `activity_member` WHERE `uID`=?)";
      let sql="SELECT * from activity where `uID`=?";
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

