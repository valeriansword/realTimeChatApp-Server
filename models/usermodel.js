
const mongoose = require("mongoose");
const bcrypt=require("bcrypt");
const userSchema=mongoose.Schema({
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"password is required"],
        
    },
    name:{
        type:String,
        required:false,       
    },
    image:{
        type:String,
        default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",

    }
    
})
userSchema.methods.matchPassword=async function(passKey){
    return await bcrypt.compare(passKey,this.password)
      
}

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    next();
})

const userModel=mongoose.model("Users",userSchema);

module.exports=userModel;