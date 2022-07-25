var express = require('express');
var app = express();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express1' });
});

// io.on('connection', (socket) => {
//   console.log('a user connected');
// });
// io.on('connection', (socket) => {
//   console.log('a user connected');

//   socket.on('disconnect', function () {
//     console.log('user disconnected');
//   });
// });
module.exports = router;
