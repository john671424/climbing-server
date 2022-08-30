var express = require('express');
var router = express.Router();
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
    let results=await select_account(req.db,req);
    if(req.session.account){
      req.socket.io.on("connection", (socket) => {
        socket.nickname = req.session.account;
        socket.join(req.session.account);//加入名為 account 的 socket room 作為專門通知 client 的管道
        req.socket.io.in(req.session.account).emit("account", "hello "+req.session.account+" welocome to the world");
      });
      
      res.json(results[0]);
    }else{
      req.session.destroy();
      res.send("login fail");
    }
  } catch (error) {
    req.session.destroy();
    res.send("login failed");
    console.log(error);
  }
});
module.exports = router;

