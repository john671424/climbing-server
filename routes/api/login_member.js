var express = require('express');
var router = express.Router();
let name;
let select_account=(db,req)=>{
  return new Promise((resolve, reject) => {
    let sql="SELECT * FROM `member` WHERE `account`=? AND `password`=?";
    let param=[req.body.account,req.body.password];
    db.query(sql,param,(err,result,fields)=>{
      if(err){
        reject(err);
      }else{
        if(result.length!=1){
          reject("no result");
        }else{
          req.session.account=result[0].account;
          resolve(result);
        }
      }
    })
  });
}
router.post('/',async function(req, res, next) {
  try{
    let counter=1;
    let results=await select_account(req.db,req);
    if(req.session.account&& counter==1){
      name=req.session.account;
      req.socket.io.on("connection", (socket) => {
        //socket.nickname = req.session.account;
        if (name==req.session.account){
          socket.join(req.session.account);//加入名為 account 的 socket room 作為專門通知 client 的管道
          socket.account=req.session.account;
          req.socket.io.in(req.session.account).emit("account", "hello "+req.session.account+" welocome to the world");
          counter++;
        }
      });
      res.json(results[0]);
    }else{
      req.session.destroy();
      res.json({"result" : "Login fail"});
    }
  } catch (error) {
    req.session.destroy();
    res.json({"result" : "Login fail"});
    console.log(error);
  }
});
module.exports = router;

