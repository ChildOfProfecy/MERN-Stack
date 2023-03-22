const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError = require("../middleWare/catchAsyncError");
const User = require("../model/userModels");
const sendToken = require("../utils/jwtToken");

//Register User
exports.registerUser = catchAsyncError(async(req,res,next)=>{

    const {name,email,password} = req.body;

    const user = await User.create({
        name,email,password,
        profilepic:{
            public_id:"this is a sample id",
            url:"profilePic",
        }
    });

    sendToken(user,201,res);


});


//Login User

exports.loginUser = catchAsyncError(async(req,res,next)=>{

    const {email,password} = req.body;
    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email and Password",401))
    }

    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid Email Or Password"));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email Or Password",401));
    }

    sendToken(user,200,res);


});