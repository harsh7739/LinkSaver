const express = require("express")
const cors = require("cors")
const { userRouter } = require("./route/UserRoute")
const { urlRouter } = require("./route/LinkRoute")
require("dotenv").config()

const app = express()

app.use(express.json())
app.use(cors())

app.use("/user",userRouter)
app.use("/url",urlRouter)


const port  = process.env.PORT
app.listen(port,() => {
    console.log(`app is listing on port ${port}`)
})

module.exports = app