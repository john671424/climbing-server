var express = require('express');
var security_plus = require('../../../../security_plus');
var router = express.Router();
// {
//     "uID":"9"
//     "aID":"1",
// }
let delete_activity = (db, aID) => {
  return new Promise((resolve, reject) => {
    let sql = "DELETE FROM `activity` WHERE `aID`=?";
    let param = [aID];
    db.query(sql, param, (err, result) => {
      if (err) {reject(err);}
      else {resolve(result);}
    })
  });
}
router.post('/',security_plus,async function (req, res, next) {
  try { 
    let delete_activity_results = await delete_activity(req.db, req.body.aID);
    res.json({ "result": "Delete a activity successfully" })
  } catch (error) {
    res.json({ "result": "Fail to delete a activity" });
    console.log(error);
  }
});
module.exports = router;
