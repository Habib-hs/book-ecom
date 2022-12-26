
const express = require("express");
const authController = require("../controller/authController");
const router = express.Router();
const {verifyAdmin, verifyToken, verifyUser} = require("../utlis/verifyToken")

//  router.get("/chuthentieckacation", verifyToken, (req,res,next)=>{
//   res.send("hello user, you are logged in")
//  })

//  router.get("/checkuser/:id",verifyToken,verifyUser, (req,res,next)=>{
//   res.send("hello user, you are logged in and you can delete your account") })

//  router.get("/checkadmin/:id",verifyToken, verifyAdmin, (req,res,next)=>{
//    res.send("hello admin, you are logged in and you can delete all accounts")
// })


router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

module.exports = router;
