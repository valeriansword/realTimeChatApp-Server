const express=require("express");
const conversationModel=require("../models/conversationModel.js");
const messageModel=require("../models/messageModel.js");
const { GetReceiverSocketId, io } = require("../socket/socket.js");
const sendMessage=async(req,res)=>{
        try{const {recId}=req.params;
        const senderId=req.user._id;
        const {content}=req.body;
        let conversation=await conversationModel.findOne({
            participants:{$all:[senderId,recId]}
        })
        if(!conversation){
            conversation=new conversationModel({
                participants:[senderId,recId]
            })
            conversation.save()
        }
        const newMessage=new messageModel({
            conversationId:conversation._id,
            sender:senderId,
            content:content,
            createdAt:new Date()
        }) 
        await newMessage.save();
        const receiverSocketId=GetReceiverSocketId(recId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage)
        }
        
        return res.json({newMessage:newMessage})}catch(err){console.log(err); return res.status(500).json(err)}
}
const receiveMessage=async(req,res)=>{
        try{
            const {id}=req.params;
        const senderId=req.user._id;
        const conversation=await conversationModel.findOne({
            participants:{$all:[senderId,id]}
        })
        if(!conversation){
            return res.status(500).json({message:"not found"});
        }
        const message=await messageModel.find({
            conversationId:conversation._id
    }).sort({createdAt:1})
            return res.status(200).json({message:message})
        }catch(err){
            console.log(err);
            return res.status(500).json(err);
        }
}

module.exports={sendMessage,receiveMessage}