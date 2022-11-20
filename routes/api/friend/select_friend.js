var express = require('express');
var router = express.Router();
// {
//     "uID":"1",
// }

let select_friend=(db,req)=>{
  return new Promise((resolve, reject) => {
    let sql="SELECT * FROM `friend` WHERE `uID1`=? and `status`=0";
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
      let results=await select_friend(req.db,req);
      res.json(results);
    }else{
      req.session.destroy();
      res.json({"result" : "Session fail"});
    }
  }catch (error) {
    res.json({"result" : "Fail to select friend"});
    console.log(error);
  }
});

module.exports = router;

