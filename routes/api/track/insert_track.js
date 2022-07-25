var express = require('express');
var router = express.Router();
// {
//     "uID":,
//     "track_name":,
//     "track_locate":,
//     "start":,
//     "finish":,
//     "total_distance":,
//     "track_type":
// }
let insert_track=(db,req)=>{
  return new Promise((resolve, reject) => {
    let sql="INSERT INTO `track`(`uID`, `track_name`, `track_locate`, `start`, `finish`, `total_distance`,`track_type`) VALUES (?,?,?,?,?,?,?)";
    let param=[req.body.uID, req.body.track_name, req.body.track_locate, req.body.start, req.body.finish, req.body.total_distance, req.body.track_type];
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
    let results=await insert_track(req.db,req);
    
    console.log("insert success");
    res.send("insert success");
  }catch (error) {
    console.log(error);
  }
});

module.exports = router;

