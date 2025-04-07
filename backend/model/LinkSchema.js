const mongoose = require("mongoose")

const linkSchema = mongoose.Schema({
    Title:String,
    URL:String,
    Description:String,
    Category:String
},{
    versionKey:false
})

const LinkModel = mongoose.model("link",linkSchema)

module.exports = {LinkModel}