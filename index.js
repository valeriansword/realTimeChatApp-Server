const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const UserRoute = require("./routes/UserRoute.js");
const ChatRouter=require("./routes/ChatRoute.js");
const path=require("path")




dotenv.config()
const {app,server}=require("./socket/socket.js")
app.use(express.json());
app.use(cors(
    {origin: "https://real-time-chat-app-delta-eight.vercel.app",
        methods:["GET","POST","PUT","DELETE"],
        
      
    }

));

const PORT=process.env.PORT || 3000;

app.use("/api/user",UserRoute);
app.use("/api/chat/message",ChatRouter)

//------------------Deployment-----------------
const __dirname1=path.resolve();
if(process.env.NODE_ENV==="production"){
app.use(express.static(path.join(__dirname1,"../frontend/dist")));
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname1,"frontend","dist","index.html"));

})
}else{
    app.get("/",(req,res)=>{
         res.send("<h1>hello from backend</h1>");
    })
}


//------------------Deployment-----------------
mongoose.connect(process.env.MONGO_URI).
then(res=>{
    console.log("db connected");
}).catch(err=>{console.log(err)})


server.listen(PORT,()=>{
    console.log("server started on port 3000")
})