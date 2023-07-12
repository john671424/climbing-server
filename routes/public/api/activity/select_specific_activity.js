var express = require('express');
var security= require('../../../../security');
var router = express.Router();
// {
//     "aID":"1",
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
router.post('/',security,async function(req, res, next) {
  try{
    let results_select=await select_activity(req.db,req);
    res.json(results_select[0]);
  }catch (error) {
    res.json({"result" : "Fail to query the specific activity"});
    console.log(error);
  }
});
module.exports = router;

