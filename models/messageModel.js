
const mongoose = require("mongoose");

const messageSchema=new mongoose.Schema({
    conversationId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Conversation",
        required:true
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    content:{
        type:String,
        
        required:true
    }
},{timestamps:true})

const messageModel=mongoose.model("Message",messageSchema);

module.exports=messageModel