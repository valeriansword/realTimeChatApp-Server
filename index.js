const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const UserRoute = require("./routes/UserRoute.js");
const ChatRouter=require("./routes/ChatRoute.js");





dotenv.config()
const {app,server}=require("./socket/socket.js")
app.use(express.json());
app.use(cors(
    {origin: "https://real-time-chat-app-123.vercel.app",
        methods:["GET","POST","PUT","DELETE"],
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"]
    }

));

const PORT=process.env.PORT || 3000;

app.use("/api/user",UserRoute);
app.use("/api/chat/message",ChatRouter)

mongoose.connect(process.env.MONGO_URI).
then(res=>{
    console.log("db connected");
}).catch(err=>{console.log(err)})


server.listen(PORT,()=>{
    console.log("server started on port 3000")
})