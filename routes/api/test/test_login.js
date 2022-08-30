var express = require('express');
var router = express.Router();
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
//let session_socket=(db,req)=>{
router.get('/',async function(req, res, next) {
  try{
    let results=await select_account(req.db,req);
    //let session_socket_results=await session_socket(req.db,req);
    if(req.session.account){
      req.socket.io.on("connection", (socket) => {
        socket.on("private message", (anotherSocketId, msg) => {
          console.log(anotherSocketId);
          console.log(msg);
          req.socket.io.sockets.to(anotherSocketId).emit("private message", socket.id, msg);
        });
        socket.join(req.session.account);
        req.socket.io.sockets.in(req.session.account).emit("account", "hello "+req.session.account+" welocome to the world");
        
      });
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

