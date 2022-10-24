const { log } = require('debug/src/browser');
var express = require('express');
var router = express.Router();
let socketMap={};

let name;
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
    let counter=1;
    let results=await select_account(req.db,req);
    if(req.session.account){
      name=req.session.account;
      
      req.socket.io.sockets.on("connection", (socket) => {
        
        if (name==req.session.account && counter==1) {
          console.log(socket.sessionID);
          socket.join(req.session.account);
          console.log(socket.handshake.auth.sessionID);
          console.log("join "+req.session.account+" room");
          socket.on("private message", (anotherSocketId, msg) => {
            console.log(req.session.account+" send message");
            req.socket.io.sockets.to(anotherSocketId).emit("private message", socket.id, msg);
            counter--;
          });
          req.socket.io.sockets.in(req.session.account).emit("account", "hello "+req.session.account+" welocome to the world");
        }
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
// V1
// name=req.session.account;
// console.log("name:"+name);
// req.socket.io.sockets.on("connection", (socket) => {
//   let dul_count = 0;
//   for (const key in socketMap) {
//     if(socketMap[key] == socket.id) {
//       dul_count += 1;
//     }
//   }
//   console.log("account:"+req.session.account);
//   console.log("name:"+name);
//   if (dul_count == 0 && name==req.session.account) {
//     socket.join(`${req.session.account}`);
//     console.log(`${socket.id} join ${req.session.account}`);
//     socketMap[counter++] = `${socket.id}`
//   }
//   console.log(socketMap);
//   console.log("sids: ");
//   console.log(req.socket.io.sockets.adapter.sids);
//   console.log("-----------------------------");
//
//
// v2
//
// savesocketid.push(socket.id);
// console.log(savesocketid);
// let dul_count = 0;
// for (const key in socketMap) {
//   if(socketMap[key] == socket.id) {
//     dul_count += 1;
//   }
// }
// console.log("account:"+req.session.account);
// console.log("name:"+name);
// if (dul_count == 0) {
//   socketMap[counter++] = `${socket.id}`
// }
// console.log(socketMap);
// console.log(savesession);
// console.log("sids: ");
// console.log(req.socket.io.sockets.adapter.sids);
// console.log("-----------------------------");
// socket.on("private message", (anotherSocketId, msg) => {
//   //console.log(anotherSocketId);
//   //console.log(msg);
//   req.socket.io.sockets.to(anotherSocketId).emit("private message", socket.id, msg);
// });
// socket.join(req.session.account);
// req.socket.io.sockets.in(req.session.account).emit("account", "hello "+req.session.account+" welocome to the world");
