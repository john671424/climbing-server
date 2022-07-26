var express = require('express');
var router = express.Router();
//檢查空值 帳號重複判斷
let signupcheck=(db,req)=>{//帳號重複判斷
  return new Promise((resolve, reject) => {
    let sql="SELECT `account` FROM `member` WHERE account=?";
    let param=[req.body.account];
    db.query(sql,param,(err,result,fields)=>{
      if(err){
        reject(err);
      }else{
        resolve(result);
      }
    })
  });
}
let signupmember=(db,req)=>{//註冊
  return new Promise((resolve, reject) => {
    let sql="INSERT INTO `member`(`name`, `account`, `password`, `email`, `phone`) VALUES (?,?,?,?,?)";
    let param=[req.body.name,req.body.account,req.body.password,req.body.email,req.body.phone];
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
    if([req.body.name,req.body.account,req.body.password,req.body.email,req.body.phone].some(function(item,index,array){return item == "";})){
      console.log("some null");//空值
      res.json({"result" : "Some null"});
    }else{
      let results=await signupcheck(req.db,req);//帳號重複判斷
      if(results.length!=0){
        console.log("repeat account");
        res.json({"result" : "Repeat account"});
      }else{
        let results=await signupmember(req.db,req);//註冊
        console.log("create account");
        res.json({"result" : "Create account"});
      }
    }
  } catch (error) {
    res.json({"result" : "Fail to create account"});
    console.log(error);
  }
});

module.exports = router;

