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
    let results=await select_friend(req.db,req);
    console.log("select success");
    res.send("select success");
    console.log(results);
  }catch (error) {
    console.log(error);
  }
});

module.exports = router;

