const { log } = require("debug/src/browser");
const io = require( "socket.io" )();
var sql = require('./mysql_api');
const socket_api = { 
    io: io
};
activity=[];
//活動開始 請 client 下載 track
//
// Add your socket.io logic here!
io.on( "connection", function( socket ) {
  console.log("ㄏㄏㄏrooms:",io.sockets.adapter.rooms);
  
    console.log( "A user connected" );
    socket.emit("hello", "world");
    socket.on( "hello", (msg)=> {
        console.log( "A "+msg );
    });
    socket.on('ctlmsg',async (msg) => {
        console.log("in ctlmsg");
        if(msg.ctlmsg=="join account room" ){socket.join(msg.account_msg);}
        if(msg.ctlmsg=="join activity room" ){
          socket.join(msg.activity_msg);
          //let update_activity_member_results=await update_activity_member(sql.pool,msg);
        }
        if(msg.ctlmsg=="leave activity room" ){socket.leave(msg.activity_msg);}
        if(msg.ctlmsg=="broadcast location"){
          console.log(msg.location_msg);
          socket.to(msg.activity_msg).emit("activity",
          {"account_msg":msg.account_msg,
          "activity_msg":msg.activity_msg,
          "location_msg":msg.location_msg});
        }
        if(msg.ctlmsg=="friend request"){
          socket.in(msg.friend_msg).emit("account",
          {"ctlmsg":msg.ctlmsg,
          "account_msg":msg.account_msg,
          "friend_msg":msg.friend_msg});
        //account 想加 friend's account 為朋友
        }
        if(msg.ctlmsg=="friend response"){
          socket.in(msg.friend_msg).emit("account",
          {"ctlmsg":msg.ctlmsg,
          "friend_msg":msg.friend_msg,
          "account_msg":msg.account_msg});
        //account 想加 friend's account 為朋友
        }
      });
});
let update_activity_member=(db,msg)=>{
  return new Promise((resolve, reject) => {
    let sql="UPDATE `activity_member` SET `status`=2 WHERE `aID`=? and `uID`=?";
    let account_uid=msg.account_msg.split(' ');
    let activity_aid=msg.activity_msg.split(' ');
    let param=[activity_aid[0],account_uid[0]];
    db.query(sql,param,(err,result,fields)=>{
      if(err){
        reject(err);
      }else{
        resolve(result);
      }
    })
  });
}
module.exports = socket_api;