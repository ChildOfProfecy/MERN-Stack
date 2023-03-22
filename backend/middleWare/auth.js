const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../model/userModels");


exports.isAuthenticatedUser = catchAsyncError(async(req,res,next)=>{

    const token = req.cookie;

    if(!token){
        return next(new ErrorHandler("Please Login to Access this feature",401));
    }

    const decodedData = jwt.verify(token,process.env.JWT_SECRET);

    req.user = await User.findById(decodedData._id);

    next();
});

exports.authorizeRoles = (...roles)=>{


    return (req,res,next)=>{

        if(!roles.includes(req.user.role)){

            new ErrorHandler(`Role:${req.user.role} is not allowed to access this`);
        }

        next();
        

    };
};