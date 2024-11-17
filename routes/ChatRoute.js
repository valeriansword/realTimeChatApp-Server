const express=require("express");
const { protect } = require("../middleware/authProtect");
const { sendMessage, receiveMessage } = require("../controllers/MessageController");
const router=express.Router();

router.route("/send/:recId").post(protect,sendMessage)
router.route("/receive/:id").get(protect,receiveMessage)
module.exports=router;