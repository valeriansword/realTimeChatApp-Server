const {Server}=require("socket.io");

const http=require("http");
const express=require("express");


const app=express();


const onLineUsers={}
const server=http.createServer(app)
const io=new Server(server,{
    cors:{
        origin: "http://localhost:5173",
        methods:["GET","POST"],
       allowedHeaders: 'Content-Type, Authorization'
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
