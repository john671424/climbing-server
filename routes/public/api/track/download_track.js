var express = require('express');
var security= require('../../../../security');
var router = express.Router();
const path =require('path');
// {
//     "tID":"1",
// }
let select_track=(db,req)=>{
  return new Promise((resolve, reject) => {
    let sql="SELECT * FROM `track` where `tID`=? and `track_locate` <> 'null'";
    let param=[req.body.tid];
    db.query(sql,param,(err,result,fields)=>{
      if(err || !result.length){
        reject(err);
      }else{
        resolve(result);
      }
    })
  });
}
router.get('/',security,async function(req, res, next) {
  try{
    let select_track_results=await select_track(req.db,req);
    res.download(path.resolve('./')+"/files/"+select_track_results[0].track_locate, function(err) {
      console.log("downloading");
      if(err) {
          console.log(err);
      }
    })
  }catch (error) {
    res.status(404).json({"result" : "Fail to download track"});
    console.log(error);
  }
});

module.exports = router;
