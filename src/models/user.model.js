const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"username alredy exists"],
        required:true
    },
    email:{
        type:String,
        unique:[true,"user with this email alredy exists"],
        required:true
    },
    password:{
        type:String,
        unique:[true]
    }
})

const userModel = mongoose.model("user",userSchema)

module.exports = userModel