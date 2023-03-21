var express = require('express');
var router = express.Router();
// {
//     "uID":"1",
// }
let select_activity=(db,req)=>{
  return new Promise((resolve, reject) => {
    let sql="SELECT * FROM `activity` where aID=?";
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
      let results_select=await select_activity(req.db,req);
      res.json(results_select[0]);
    }else{
      req.session.destroy();
      res.json({"result" : "Session fail"});
    }
  }catch (error) {
    res.json({"result" : "Fail to query the specific activity"});
    console.log(error);
  }
});

module.exports = router;

