var express = require('express');
var router = express.Router();
// {
//     "uID":"1",
// }

let select_friend=(db,req)=>{
  return new Promise((resolve, reject) => {
    let sql="SELECT * FROM `friend` WHERE `uID1`=?";
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

