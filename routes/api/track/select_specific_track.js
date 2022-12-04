var express = require('express');
var router = express.Router();
// {
//     "tID":"1",
// }
let select_track=(db,req)=>{
  return new Promise((resolve, reject) => {
    let sql="SELECT * FROM `track` WHERE `tid`=?";
    let param=[req.body.tID];
    db.query(sql,param,(err,result,fields)=>{
      if(err || !result.length || result.length!=1){
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
      res.json(results_select[0]);
    }else{
      req.session.destroy();
      res.status(405).json({"result" : "Session fail"});
    }
  }catch (error) {
    res.status(405).json({"result" : "Fail to query the specific track"});
    console.log(error);
  }
});

module.exports = router;

