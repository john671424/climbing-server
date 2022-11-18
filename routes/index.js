const { log } = require('debug/src/browser');
var express = require('express');
// var http = require('http').Server(app);
// var io = require('socket.io')(http);
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
          console.log("error");
          reject("no result");
        }else{
          req.session.account=result[0].account;
          resolve(result);
        }
      }
    })
  });
}
router.get('/',async function (req, res, next) {
  // Socket 的結構是 
  // socket_api 這個 module 裡面有一個屬性叫做 io
  // 你在 app 裡面引入的時候
  // 直接把 socket_api 變成 io
  // 
  try {
    let results=await select_account(req.db,req);
    req.socket.io.on("connection", (socket) => {
      if(req.session.account){
        //req.socket.io.emit("test", req.session.account);
        socket.emit("test", req.session.account);//==req.socket.io.emit("test", req.session.account);
        socket.join("room1");
        req.socket.io.in("room1").emit('connectToRoom', "hello1");//req.socket.io.in("room1").emit('connectToRoom', "hello");
        socket.on("hello", (arg) => {
          console.log(arg); // world
        });
        socket.on("private message", (anotherSocketId, msg) => {
          console.log("SocketId:"+anotherSocketId);
          console.log("msg:"+msg);
          console.log(socket.id);
          req.socket.io.in(anotherSocketId).emit("private message", socket.id, msg);
        });
        //socket.emit("john1", req.session.account);
      }
      
    });

    res.render('index', { title: 'Express1' });
  } catch (error) {
    res.render('index', { title: 'Error' });
  }
});

module.exports = router;
