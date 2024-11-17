const jwt=require("jsonwebtoken");
const userModel=require("../models/usermodel.js");

const protect=async(req,res,next)=>{
    let token;
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ){
        try{
        token=req.headers.authorization.split(" ")[1];
        const decoded=jwt.verify(token,process.env.JWT_KEY);
        req.user=await userModel.findById(decoded.id).select("-password");
        if (!req.user) {
            return res.status(401).json({ message: "User not found" });
        }
         next();     
    }catch(err){
        res.status(401).send("error occurend");
        console.log(err);
    }
}
    if(!token){
        res.status(401).json({message:"something went wrong"});
    }
}

module.exports={protect};