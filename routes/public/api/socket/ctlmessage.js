const { log } = require('debug/src/browser');
var express = require('express');
var router = express.Router();
let name;
router.post('/',async function(req, res, next) {
  try{
    if(req.session.account){
      name=req.session.account;
      req.socket.io.on("connection", (socket) => {
        socket.on('ctl',(msg,ctlmsg,account_msg,activity_msg) => {
          console.log("ctlaccount said:  "+msg);
          if(ctlmsg){console.log("ctlcontrolmsg: "+ctlmsg);}
          if(account_msg){console.log("ctlaccount_msg: "+account_msg);} 
          if(activity_msg){console.log("activity_msg: "+activity_msg);}
          if(ctlmsg=="join socekt room" && name==req.session.account){
            console.log("join "+activity_msg+" room");
            socket.join(activity_msg);
          }
        });
      });
      res.render('index', { title: req.session.account });
    }else{
      req.session.destroy();
      res.json({"result" : "session fail"});
    }
  }catch (error) {
    res.json({"result" : "Fail to use ctlmessage"});
    console.log(error);
  }
});

module.exports = router;

