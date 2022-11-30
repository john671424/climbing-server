const { log } = require("debug/src/browser");
const io = require("socket.io")();
var sql = require('./mysql_api');
const socket_api = {
  io: io
};
activity = {};
let counter = 0;
//活動開始 請 client 下載 track
//

// Add your socket.io logic here!
io.on("connection", function (socket) {
  console.log("A user connected");
  // socket.join(socket.account);
  socket.emit("hello", "world");
  socket.on("hello", (msg) => {
    console.log("A " + msg);
  });
  socket.on('ctlmsg', async (msg) => {
    console.log("in ctlmsg");
    if (msg.ctlmsg == "join account room") { socket.join(msg.account_msg); }
    if (msg.ctlmsg == "join activity room") {
      socket.join(msg.activity_msg);
      //let update_activity_member_results=await update_activity_member(sql.pool,msg);
    }
    if (msg.ctlmsg == "leave activity room") { socket.leave(msg.activity_msg); }
    if (msg.ctlmsg == "broadcast location") {
      socket.to(msg.activity_msg).emit("activity",
        {
          "ctlmsg": msg.ctlmsg,
          "account_msg": msg.account_msg,
          "activity_msg": msg.activity_msg,
          "location_msg": msg.location_msg,
          "distance_msg": msg.distance_msg
        });
      same_account = false;
      if (activity[msg.activity_msg]) {
        for (var i = 0; i < activity[msg.activity_msg].length; i++) {
          if (activity[msg.activity_msg][i].account_msg == msg.account_msg) {
            same_account = true;
            activity[msg.activity_msg][i] = { "account_msg": msg.account_msg, "location_msg": msg.location_msg };
            break;
          }
        }
        if (!same_account) {
          activity[msg.activity_msg][activity[msg.activity_msg].length] = { "account_msg": msg.account_msg, "location_msg": msg.location_msg };
          same_account = false;
        }
      } else {
        activity[msg.activity_msg] = [{ "counter": 0 }, { "account_msg": msg.account_msg, "location_msg": msg.location_msg }]
      }
      console.log(activity);
      activity[msg.activity_msg].forEach(element => {
        try {
          var p = 0.017453292519943295;
          var a = 0.5 -
            Math.cos((msg.location_msg.latitude - element.location_msg.latitude) * p) / 2 +
            Math.cos(element.location_msg.latitude * p) *
            Math.cos(msg.location_msg.latitude * p) *
            (1 - Math.cos((msg.location_msg.longitude - element.location_msg.longitude) * p)) / 2;
          distance = 12742 * Math.asin(Math.sqrt(a));
          console.log(distance * 1000);
          
          if (distance * 1000 > msg.distance_msg && activity[msg.activity_msg][0].counter%(100*(activity[msg.activity_msg].length-1))==0) {
            activity[msg.activity_msg][0]={"counter":activity[msg.activity_msg][0].counter+1}
            console.log("warning");
            var datetime = new Date(+new Date + 8 * 3600 * 1000);
            io.in(msg.activity_msg).emit("activity", {
              "ctlmsg": "activity warning",
              "wanring_msg": "too far",
              "activity_msg": msg.activity_msg,
              "account_msg_1": element.account_msg, // 距離過遠的人 1
              "account_msg_2": msg.account_msg, // 距離過遠的人 2 
              "long_distance": distance * 1000, // 兩人最遠距離
              "time_msg": new Date(datetime).toISOString().slice(0, 19).replace('T', ' ') // 發出警告的時間
            })
          }else{
            console.log("counter: "+activity[msg.activity_msg][0].counter);
            console.log("war counter: "+100*(activity[msg.activity_msg].length-1));
          }
        } catch (error) { }

      });
    }
    // if (msg.ctlmsg == "friend request") {
    //   socket.in(msg.friend_msg).emit("account",
    //     {
    //       "ctlmsg": msg.ctlmsg,
    //       "account_msg": msg.account_msg,
    //       "friend_msg": msg.friend_msg
    //     })
    //       counter++;
    //       console.log("friend request counter:"+counter);
    //       console.log(new Date());

    //   //account 想加 friend's account 為朋友
    // }
    if (msg.ctlmsg == "friend response") {
      socket.in(msg.friend_msg).emit("account",
        {
          "ctlmsg": msg.ctlmsg,
          "friend_msg": msg.friend_msg,
          "account_msg": msg.account_msg
        });
      console.log("friend response");
      console.log(new Date());
      //account 想加 friend's account 為朋友
    }
    if (msg.ctlmsg == "activity warning") {
      io.in(msg.activity_msg).emit("activity", msg);
    }
  });
  socket.on("disconnect", function () {
    console.log("disconnect");
  });
});
let update_activity_member = (db, msg) => {
  return new Promise((resolve, reject) => {
    let sql = "UPDATE `activity_member` SET `status`=2 WHERE `aID`=? and `uID`=?";
    let account_uid = msg.account_msg.split(' ');
    let activity_aid = msg.activity_msg.split(' ');
    let param = [activity_aid[0], account_uid[0]];
    db.query(sql, param, (err, result, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    })
  });
}
module.exports = socket_api;