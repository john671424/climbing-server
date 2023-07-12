var express = require('express');
var security_plus= require('../../../../security_plus');
var router = express.Router();
// {
//     "uID":"1"
//     "tID":"1",
// }
let delete_track=(db,req)=>{
  return new Promise((resolve, reject) => {
    let sql="DELETE FROM `track` WHERE tid=?";
    let param=[req.body.tID];
    db.query(sql,param,(err,result,fields)=>{
      if(err){
        reject(err);
      }else{
        resolve(result);
      }
    })
  });
}
router.post('/',security_plus,async function(req, res, next) {
  try{
    let delete_result=await delete_track(req.db,req);
    res.json({"result" : "Delete a track successfully"});
  }catch (error) {
    res.json({"result" : "Fail to delete track"});
    console.log(error);
  }
});

module.exports = router;

