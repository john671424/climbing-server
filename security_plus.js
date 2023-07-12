async function security_plus(req, res, next){
    try{
        let member = await select_member(req.db, req.body.uID);
        if (req.session.account && member[0].account == req.session.account) {
            console.log(req.session.account);
            next();
        } else {
            console.log("session failed");
            console.log("sessionID:"+req.sessionID);
            console.log("session account:"+req.session.account);
            console.log(member[0].account);
            req.session.destroy();
            res.status(403).json({ "result": "Session fail" });
        }
    }catch(error){
        console.log(error);
        console.log("Verify failed (plus)");
        console.log("sessionID:"+req.sessionID);
        console.log("session account:"+req.session.account);
        res.status(404).json({ "result": "Fail to verify" });
    }
}
module.exports = security_plus
let select_member = (db, uID) => {
    return new Promise((resolve, reject) => {
      let sql = "SELECT * FROM `member` WHERE `uID`=?";
      let param = [uID];
      db.query(sql, param, (err, result, fields) => {
        if (err) {
          reject(err);
        } else {
          if (result.length != 1) {
            reject("error");
          } else {
            resolve(result);
          }
        }
      })
    });
  }