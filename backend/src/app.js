const express = require("express");
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors= require('cors');

//routes
const authRouter = require("./routes/authRouter.js");
// const orderRouter = require("./routes/orderRouter.js");
const categoryRouter = require("./routes/categoryRouter.js");
 const productRouter = require("./routes/productRouter.js");
const userRouter = require("./routes/userRouter.js");
const brainTreeRouter = require("./routes/braintreeRouter.js");
const orderRouter = require("./routes/orderRouter.js");

//middlewares
app.use(cors({
    origin:"http://localhost:3000"
  }))
  
app.use(express.json());
app.use(cookieParser());

//routes middleware
app.use("/api/v1", authRouter);
 app.use("/api/v1", categoryRouter);
 app.use("/api/v1", productRouter);
 app.use("/api/v1", userRouter);
app.use("/api/v1", brainTreeRouter);
 app.use("/api/v1", orderRouter);

//common error middleware
app.use((err, req, res, next)=>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went very wrong!"

    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message : errorMessage,
        stack: err.stack
    });
})

module.exports = app;