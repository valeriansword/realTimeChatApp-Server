const userModel=require("../models/usermodel.js");
const jwt = require("jsonwebtoken");

const registerUSer=(req,res)=>{
    const {name,email,password,image}=req.body;
    if(!name || !password || !email){
      return   res.status(400).json({message:"please enter all the required details"});
    }

   userModel.findOne({email}).then(userExist=>{

    if(userExist){
       return  res.status(409).json({message:"user already exist"});
    }
    userModel.create({
        name,email,password,image
    }).
    then(user=>{
        if (!user) {
            return res.status(500).json({ message: "User creation failed" });
          }
        const token=jwt.sign(
            { id: user._id, email: user.email },
           
            process.env.JWT_KEY,
            {expiresIn:"1y"}
        )
       return  res.status(200).json({
            message: "User successfully registered",
            token,  // Send the token in the response
            user: {
              id: user._id,
              name: user.name,
              email: user.email,
              image:user.image,
              profileSetup:user.profileSetup
              //pic: user.pic,
            }
          });        
    }).catch(err=>{
        console.log(err);
      return  res.status(500).json({ message: "Server error", error: err.message });
    })
   }).catch(err=>{
    console.log(err);
    return res.status(500).json({ message: "Server error", error: err.message });
   })

  
      
    }

    
    const authUser = async (req, res) => {
      const { email, password } = req.body;
    
      // Check for missing fields
      if (!email || !password) {
        return res.status(400).json({ message: "Please enter both email and password" });
      }
    
      try {
        // Find user by email
        const user = await userModel.findOne({ email });
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
    
        // Check if the password matches
        const isPasswordValid = await user.matchPassword(password);
        if (!isPasswordValid) {
          return res.status(400).json({ message: "Invalid email or password" });
        }
    
        // Generate JWT token
        const token = jwt.sign(
          { id: user._id, email: user.email },
          process.env.JWT_KEY,
          { expiresIn: "1y" }
        );
    
        // Respond with user details and token
        return res.json({
          message: "User logged in",
          token, // Send the token in the response
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            image: user.image
          }
        });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
      }
    };
    


const searchUsers=async(req,res)=>{
  try{ const keyword=req.query.search
   ?{
     $or:[
       {  name:{$regex:req.query.search,$options:"i"}  },
       { email:{$regex:req.query.search,$options:"i"}},
     ],
   }:{};
   
   const users = await userModel.find(keyword).find({ _id: { $ne: req.user._id } });
   res.status(200).json({message:"searched chats are",users:users});
 }catch(err){
   console.log(err);
   res.status(500).json({err,message:"no searched result"})
 }
   
 }

 const allUsers=async(req,res)=>{

  try{
    const users = await userModel.find({ _id: { $ne: req.user._id } }).select("-password");
  res.json({message:"searched chats are",users:users});
  }catch(err){
    console.log(err);
    res.status(500).json({message:"error for all users",err})
}
}


module.exports={registerUSer,authUser,allUsers,searchUsers}