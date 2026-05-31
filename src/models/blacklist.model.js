const mongoose = require('mongoose')


const blacklistSchema = new mongoose.Schema(
    // Define the schema for blacklisted tokens
    {
    token:{
        type:String,
        required:[true,"token is required to be added to blacklist"]
    }
   },
   // Add timestamps to the schema to track when tokens are blacklisted
   {
    timestamps:true
  }
     
  )

const blacklistModel = mongoose.model("blacklistToken",blacklistSchema)

module.exports = blacklistModel