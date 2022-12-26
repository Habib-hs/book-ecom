const express = require("express");
const userController = require("../controller/userController");
const {verifyToken, verifyAdmin} = require("../utlis/verifyToken");
const router = express.Router();


router.get('/user/:userId',  userController.getUser);
router.put('/user/:userId', userController.updateUser);
router.get('/orders/by/user/:userId', userController.purchaseHistory);

//router("userId", userController.userById)


module.exports = router;
