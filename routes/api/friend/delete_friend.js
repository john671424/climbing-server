var express = require('express');
var router = express.Router();
// {
//     "uID1":,
//     "uID2":
// }
let delete_friend=(db, req, uID1, uID2)=>{
  return new Promise((resolve, reject) => {
    let sql="DELETE FROM `friend` WHERE `uID1`=? AND `uID2`=?";
    let param=[uID1, uID2];
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
    if(req.body.uID1 != req.body.uID2){
      let results=await delete_friend(req.db,req,req.body.uID1,req.body.uID2);
      let results2=await delete_friend(req.db,req,req.body.uID2,req.body.uID1);
      console.log("delete success");
      res.send("delete success");
    }else{
      console.log("you are my friend");
      res.send("you are my friend");
    }
    
  }catch (error) {
    console.log(error);
  }
});

module.exports = router;

