var express = require('express');
var router = express.Router();

let name = [];
let curUser;
let select_account=(db,req)=>{
  return new Promise((resolve, reject) => {
    let sql="SELECT * FROM `member` WHERE `account`=? AND `password`=?";
    let param=[req.query.account,req.query.password];
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
router.get('/',async function(req, res, next) {
  try{
    let results=await select_account(req.db,req);
    if(req.session.account){
      if (!name.includes(req.session.account)){
        name.push(req.session.account);
        curUser = req.session.account;
        console.log(name);
        req.socket.io.on("connection", (socket) => {
          // 沒有檢查這個 user 是否已經在 room 裡面了，所以每次重新整理就會再被加進去 room 所以發送的訊息就會變多次
          if (curUser == req.session.account) {
            socket.join(req.session.account);
            console.log("rooms:",req.socket.io.sockets.adapter.rooms);
            socket.account=req.session.account;
            req.socket.io.in(req.session.account).emit("account", "hello "+req.session.account+" welocome to the world");
          }
        });
      }
      res.render('index', { title: req.session.account });
    }else{
      req.session.destroy();
      res.send("login fail");
      res.render('index', { title: "error" });
    }
  } catch (error) {
    req.session.destroy();
    res.send("login failed");
    console.log(error);
    res.render('index', { title: "error" });
  }
});

module.exports = router;