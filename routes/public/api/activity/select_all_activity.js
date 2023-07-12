var express = require('express');
var security= require('../../../../security');
var router = express.Router();
// {
//     "uID":"1",
// }
let select_track=(db,req)=>{
  return new Promise((resolve, reject) => {
    let sql="SELECT * FROM `activity`";
    db.query(sql,(err,result,fields)=>{
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
    let results_select=await select_track(req.db,req);
    res.json(results_select);
  }catch (error) {
    res.json({"result" : "Fail to query all activities"});
    console.log(error);
  }
});

module.exports = router;

