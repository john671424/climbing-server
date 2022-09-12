const { log } = require('debug/src/browser');
var express = require('express');
var router = express.Router();
// {
//     "tID":"1",
// }
let select_track=(db,req)=>{
  return new Promise((resolve, reject) => {
    let sql="SELECT * FROM `track` where `tID`=?";
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
const folderPath = "C:\\project\\files\\";
router.post('/',async function(req, res, next) {
  try{
    if(req.session.account){
      let select_track_results=await select_track(req.db,req);
      res.download(folderPath+select_track_results[0].track_locate, function(err) {
        console.log("downloading");
        if(err) {
            console.log(err);
        }
      })
    }else{
      req.session.destroy();
      res.json({"result" : "Session fail"});
    }
  }catch (error) {
    res.json({"result" : "Fail to download track"});
    console.log(error);
  }
});

module.exports = router;

