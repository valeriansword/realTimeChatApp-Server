const express = require("express");
const { registerUSer, authUser, allUsers, searchUsers } = require("../controllers/UserController.js");
const { protect } = require("../middleware/authProtect.js");
const router=express.Router();
// const {registerUSer}=require("../controller/UserController");
// const {authUser,allUsers}=require("../controller/UserController")
// const {protect} =require("../middleware/authMiddleWare")

router.route("/").post(registerUSer).get(protect,searchUsers);
router.post("/login",authUser);
router.route("/allUsers").get(protect,allUsers)
module.exports=router


