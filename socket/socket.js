const {Server}=require("socket.io");

const http=require("http");
const express=require("express");


const app=express();


const onLineUsers={}
const server=http.createServer(app)
const io=new Server(server,{
    cors:{
        origin: ["https://real-time-chat-app-123.vercel.app"],
        methods:["GET","POST"]
    }
})

const GetReceiverSocketId=(recId)=>{
    return onLineUsers[recId]
}
io.on("connection",(socket)=>{
    console.log("user joined",socket.id);
    socket.on("join",(receiverId)=>{
        onLineUsers[receiverId]=socket.id;
        console.log("Receiver:",receiverId,"socketId:",socket.id);
    })
})

module.exports={app,server,GetReceiverSocketId,io}
