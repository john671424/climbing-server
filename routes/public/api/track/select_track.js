const { log } = require('debug/src/browser');
var express = require('express');
var router = express.Router();
// {
//     "uID":"1",
// }
let select_track=(db,req)=>{
  return new Promise((resolve, reject) => {
    let sql="SELECT * FROM `track` WHERE `uid`=?";
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
    console.log(req.body);
    if(req.session.account){
      let results_select=await select_track(req.db,req);
      resㄉ.json(results_select);
    }else{
      req.session.destroy();
      res.status(405).json({"result" : "Session fail"});
    }
  }catch (error) {
    res.json({"result" : "Fail to select track"});
    console.log(error);
  }
});

module.exports = router;

