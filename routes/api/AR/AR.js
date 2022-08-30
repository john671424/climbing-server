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
    if(req.session.account){
      let results_select=await select_track(req.db,req);
      console.log("select success");
      res.send("select success");
      console.log(results);
    }else{
      req.session.destroy();
      res.send("session fail");
    }
  }catch (error) {
    console.log(error);
  }
});

module.exports = router;

