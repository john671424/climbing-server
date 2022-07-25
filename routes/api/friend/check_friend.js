var express = require('express');
var router = express.Router();
// {
//     "uID1":"1",
//     "uID2":"2"
// }
let select_friend=(db,req)=>{
  return new Promise((resolve, reject) => {
    let sql="SELECT * FROM `friend` WHERE `uID1`=? AND `uID2`=?";
    let param=[req.body.uID1,req.body.uID2];
    db.query(sql,param,(err,result,fields)=>{
      if(err){
        reject(err);
      }else{
        if(result.length==0){
          resolve(result);
        }else{
          reject("already friend");
        }
      }
    })
  });
}
router.post('/',async function(req, res, next) {
  try{
    if(req.body.uID1 != req.body.uID2){
      let results=await select_friend(req.db,req);
      console.log("send friend request");
      res.send("send friend request");
    }else{
      console.log("you are my friend");
      res.send("you are my friend");
    }
  }catch (error) {
    console.log(error);
    res.send("already friend");
  }
});

module.exports = router;

