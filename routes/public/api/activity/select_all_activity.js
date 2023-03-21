var express = require('express');
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
router.post('/',async function(req, res, next) {
  try{
    if(req.session.account){
      let results_select=await select_track(req.db,req);
      res.json(results_select);
    }else{
      req.session.destroy();
      res.json({"result" : "Session fail"});
    }
  }catch (error) {
    res.json({"result" : "Fail to query all activities"});
    console.log(error);
  }
});

module.exports = router;

