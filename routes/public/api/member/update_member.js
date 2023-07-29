var express = require('express');
var security_plus= require('../../../../security_plus');
var router = express.Router();
// {
//     "uID":"9",
//     "name":"蕭",
//     "password":"john",
//     "email":"test@test.com",
//     "phone":"0912345674"
// }

let update_member=(db,req)=>{
    return new Promise((resolve, reject) => {
      let sql="UPDATE `member` SET `name`=?,password=?,email=?,`phone`=? WHERE `uID`=?";
      let param=[req.body.name,req.body.password,req.body.email,req.body.phone,req.body.uID];
      db.query(sql,param,(err,result,fields)=>{
        if(err){
          reject(err);
        }else{
          resolve(result);
        }
      })
    });
  }
  let select_member=(db,req)=>{
    return new Promise((resolve, reject) => {
      let sql="SELECT * FROM `member` WHERE `uID`=?";
      let param=[req.body.uID];
      db.query(sql,param,(err,result,fields)=>{
        if(err){
          reject(err);
        }else{
          if(result.length!=1){
            reject("error");
          }else{
            resolve(result);
          }
        }
      })
    });
  }
router.post('/',security_plus,async function(req, res, next) {
  try{
      let update_member_results=await update_member(req.db,req);
      let select_update_member_results=await select_member(req.db,req);
      console.log(req.headers);
      res.json(select_update_member_results[0]);
  }catch (error) {
    res.json({"result" : "Fail to update member"});
    console.log(error);
  }
});

module.exports = router;

