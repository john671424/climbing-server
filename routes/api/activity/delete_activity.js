var express = require('express');
var router = express.Router();
// {
//     "uID":"9"
//     "aID":"1",
// }
//以到 server 時間為主
let delete_activity=(db,req)=>{
    return new Promise((resolve, reject) => {
      let sql="DELETE FROM `activity` WHERE aid=?";
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
  let select_member=(db,req)=>{
    return new Promise((resolve, reject) => {
      let sql="SELECT * FROM `member` WHERE `uID`=?";
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
    if(req.session.account && member_results[0].account==req.session.account){
      let delete_activity_results=await delete_activity(req.db,req);
      res.json({"result" : "Delete a activity successfully"})
    }else{
      req.session.destroy();
      res.json({"result" : "session fail"});
    }
  }catch (error) {
    res.json({"result" : "Fail to delete a activity"});
    console.log(error);
  }
});

module.exports = router;

