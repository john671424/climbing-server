var express = require('express');
var fs=require('fs');
var security_plus= require('../../../../security_plus');
const path =require('path');
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
let select_track=(db,req)=>{
  return new Promise((resolve, reject) => {
    let sql="Select * FROM `track` WHERE tid=?";
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
    let select_result=await select_track(req.db,req);
    let delete_result=await delete_track(req.db,req);
    console.log(select_result[0].track_locate);
    fs.unlink(path.resolve('./')+"/files/"+select_result[0].track_locate,(err => {
      if (err) console.log(err);
      else {
        console.log("Deleted file: example_file.txt");
      }
    }));
    res.json({"result" : "Delete a track successfully"});
  }catch (error) {
    res.json({"result" : "Fail to delete track"});
    console.log(error);
  }
});

module.exports = router;

