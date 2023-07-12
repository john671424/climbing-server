function security(req, res, next){
    try{
        if(req.session.account){next()}
        else{
            console.log("Session failed");
            console.log("sessionID:"+req.sessionID);
            console.log("session account:"+req.session.account);
            req.session.destroy();
            res.status(403).json({ "result": "Session fail" });
        }
    }catch(error){
        console.log("Verify failed");
        console.log("session:"+req.session);
        console.log("session account:"+req.session.account);
        res.status(404).json({ "result": "Fail to verify" });
    }
}
module.exports = security