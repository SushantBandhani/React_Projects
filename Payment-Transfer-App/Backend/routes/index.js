const express=require("express")
const {User,connectDB}=require("../db")
const userRouter=require('./user')
const accountRouter=require('./account')
const router=express.Router()


router.use("/user",userRouter)
router.use("/account",accountRouter)
router.get("",()=>{

})

module.exports=router
