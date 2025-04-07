const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { UserModel } = require("../model/UserSchema")
const { auth } = require("../middleware/AuthMiddleware")
const userRouter = express.Router()


userRouter.post("/register",async(req,res)=>{
    console.log(req.body)
    const {userName,email,password} = req.body
    
    try {
        const user = await UserModel.findOne({email})
        if(user){
            res.status(200).send({"msg":"User allready exist!!"})
        }else{
            bcrypt.hash(password, 5, async(err, hash)=> {
               if(err){
                res.status(200).send({"msg":"can not hash password"})
               }else{
                const user = new UserModel({userName,email,password:hash})
                await user.save()
                res.status(200).send({"msg":"Registration Successfull"})
               }
            });
        }
    } catch (error) {
        res.status(400).send({"error":error})
    }
})

userRouter.use(auth)

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try {
        const user = await UserModel.findOne({email})
        if(user){
            console.log(user)
            bcrypt.compare(password, user.password, (err, result)=> {
                console.log(result)
                if(result){
                    const token = jwt.sign({username:user.username,userID:user._id}, "masai");
                    res.status(200).send({"msg":"Login Successfull","token":token})
                }else{
                    res.status(200).send({"msg":"Wrong credential"})
                }
            });
        }else{
            res.status(200).send({"msg":"User Not found!!"})
        }
    } catch (error) {
        res.status({"error":error.message})
    }
})


module.exports = {userRouter}