const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel')
const { createError } = require("../utlis/error.js");

const signToken = (id, role) =>{
    return jwt.sign({ id, role }),process.env.JWT_SECRET , 
    {
        expiresIn: process.env.JWT_EXPIRES_IN,
    }
}

exports.signup=async(req, res, next)=>{

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    try{
       const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash
       })
       await newUser.save();
        res.status(200).json({
            message: "success",
            data: {
                user: newUser
            }
        })

    }catch(err){
        next(err);
    }
   
}

exports.login = async (req, res, next)=>{
     //console.log(req.body)
    try{

    const user = await User.findOne({name: req.body.name})
      // console.log(user)
    //1) If USER doesn't exist 

    if(!user) return next(createError(404, "User not found! Please Signup first."));

    // 2) IF user exist, check the password

    const isPasswordCorrect = bcrypt.compare(
        req.body.password,
        user.password
    )

     // 3) IF the PAsSWORD is wrong

     if(!isPasswordCorrect) return next(createError(404, "Wrong username or password"))

     //4) if USER and PASSWORD are correct , create JSON token

     
     const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET
     );

     //const token =  signToken(user._id, user.role);
     //const tokena =  req.cookies.access_token;
    // console.log(tokena);

     const {password, role, ...otherDetails} = user._doc
    
      res.cookie("access_token",  token , {httpOnly: true}).status(200).json({
        status: "success",
        token,
        role,
        ...otherDetails
      });

    }catch(err){
        next(err)
    }
    
    }

exports.logout = (req, res, next) =>{
    try{
        res.clearCookie('access_token')
        res.json({message: 'Signout Successfully.'})
    }catch(err){
        next(err)
    }
  
}
