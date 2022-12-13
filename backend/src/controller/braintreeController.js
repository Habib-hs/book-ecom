const User = require('../models/userModel');
const braintree = require('braintree');
require('dotenv').config();


 

 

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox, // Production
    merchantId: "ytdkyq7c4vdwzvcn",        // process.env.BRAINTREE_MERCANT_ID,
    publicKey:   "2jxynx3pmgwrq7zs", //process.env.BRAINTREE_PUBLIC_KEY ,
    privateKey:   "8d5bc164eafec2bb0c05e451f7c4f7a9"// process.env.BRAINTREE_PRIVATE_KEY
});

exports.generateToken = (req, res) => {

    gateway.clientToken.generate({}, function(err, response) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(response);
        }
    });
};

exports.processPayment = (req, res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce;
    let amountFromTheClient = req.body.amount;
    // charge
    let newTransaction = gateway.transaction.sale(
        {
            amount: amountFromTheClient,
            paymentMethodNonce: nonceFromTheClient,
            options: {
                submitForSettlement: true
            }
        },
        (error, result) => {
            if (error) {
                res.status(500).json(error);
            } else {
                res.json(result);
            }
        }
    );
};