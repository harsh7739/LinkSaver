const jwt = require("jsonwebtoken")
const auth = (req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1]
    console.log(token)
    if(token){
        jwt.verify(token, "masai", (err, decoded)=> {
            if(decoded){
             req.body.userID = decoded.userID;
             req.body.username= decoded.username                                                                                                                                             
              next()
            }else{
                res.status(400).send({"error":"You are not authorised"})
            }
            });
    }else{
        res.status(400).send({"error":"Pease Login!!"})
    }
    

}
module.exports = {auth}