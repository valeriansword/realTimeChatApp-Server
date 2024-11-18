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
    {
        origin: "http://localhost:5173",
        methods:["GET","POST","PUT","DELETE"],
        allowedHeaders: 'Content-Type, Authorization'
        
      
    }

));
app.options('*', (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).end(); // Respond with HTTP 200
});

const PORT=process.env.PORT || 3000;

app.use("/api/user",UserRoute);
app.use("/api/chat/message",ChatRouter)

//------------------Deployment-----------------
app.get("/",(req,res)=>{
    res.send("<h1>hello</h1>");
})

//------------------Deployment-----------------
mongoose.connect(process.env.MONGO_URI).
then(res=>{
    console.log("db connected");
}).catch(err=>{console.log(err)})


server.listen(PORT,()=>{
    console.log("server started on port 3000")
})