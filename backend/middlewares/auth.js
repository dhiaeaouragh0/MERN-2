const User = require('../models/user');
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");

// check if user is authenticated or not 
exports.isAuthenticatedUser = catchAsyncError(async(req,res,next) => {

    const { token } = req.cookies

    if(!token){
        return next(new ErrorHandler('Login first to access this resource',401))
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id)
    next()
})

// Handling users roles 
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)){
            return next(new ErrorHandler('User role is not authorized to perform this action',403))
        }
        next()
    }
}