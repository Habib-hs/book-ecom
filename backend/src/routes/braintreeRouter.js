const express = require("express");
const router = express.Router();
const braintreeController = require("../controller/braintreeController");

const {verifyAdmin, verifyToken, verifyUser} = require("../utlis/verifyToken")



router.get("/braintree/getToken/:userId",braintreeController.generateToken);
router.post(
    "/braintree/payment/:userId", verifyToken, verifyUser,
    braintreeController.processPayment
);



module.exports = router;