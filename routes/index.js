var express = require('express');
// var http = require('http').Server(app);
// var io = require('socket.io')(http);
var router = express.Router();

router.get('/', function (req, res, next) {
  // Socket 的結構是 
  // socket_api 這個 module 裡面有一個屬性叫做 io
  // 你在 app 裡面引入的時候
  // 直接把 socket_api 變成 io
  // 
  req.socket.io.on("connection", (socket) => {
    req.socket.io.emit("test", req.sessionID);
    console.log("sended");
    console.log("session:"+req.session)
    console.log("sessionID:"+req.sessionID)
  });
  res.render('index', { title: 'Express1' });
});

module.exports = router;
