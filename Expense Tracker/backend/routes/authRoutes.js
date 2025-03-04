const express=require("express")

const{registerUser,loginUser,getUserInfo,}=require("../controllers/authController")

const router=express.Router()

router.post("/register",registerUser);
router.post("/login",registerUser);
// router.post("/getUser",protect,registerUser);

module.exports=router