const User = require('../models/user')

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncError');
const APIFeatures = require('../utils/apiFeatures');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const cloudinary = require('cloudinary');

//Register a user => api/v1/register

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    // Handle file upload if present
    let avatarResult;
    if (req.body.avatar) {
        // Upload image to Cloudinary
        avatarResult = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'avatars',
            width: 150,
            crop: 'scale'
        });
    } else {
        // Use a default avatar if no file is uploaded
        avatarResult = {
            public_id: 'default_avatar',
            secure_url: 'https://res.cloudinary.com/dvc4qaaew/image/upload/v1724477490/avatars/gme4u21jygnfs6xshxc6.jpg'
        };
    }

    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: avatarResult.public_id,
            url: avatarResult.secure_url
        }
    });

    sendToken(user, 200, res);
});

//  Login user => /a[i/v1/login]
exports.loginUser = catchAsyncErrors( async(req,res,next) => {
    const {email, password } = req.body;

    //Check if email and password is entered by user
    if(!email || !password) {
        return next(new ErrorHandler('Please enter email and password',400));
    }
    // finding user in db 
    const user = await User.findOne({email}).select('+password')

    if(!user){
        return next(new ErrorHandler('Invalid email or password',401));
    }

    // Check if password is correct
    const isPasswordMatched = await user.comparePassword(password)

    if(!isPasswordMatched){
        return next(new ErrorHandler('Invalid password',401));
    }

    sendToken(user,200,res)
})

// Forgot password => /api/v1/password/forgot
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({email: req.body.email})   

    if(!user) {
        return next(new ErrorHandler('User not found',404));
    }
    //get reset token 
    const resetToken = user.getResetPasswordToken()

    await user.save({validateBeforeSave: false})

    // Create reset password url
    const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`

    const message = `Your password reset token is as follow:\n\n${resetUrl}\n\n
    If you have not requested this email , then ignore it.`

    try {
        await sendEmail({
            email: user.email,
            subject: 'Password reset token',
            message
        })
        res.status(200).json({success: true, message: 'Email sent successfully'})

    }catch(error) {
        user.resetPasswordToken = undefined
        user.resetTokenExpiration = undefined
        await user.save({validateBeforeSave: false})
    }
})
// reset password => /api/v1/password/reset/:token
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    //Hash URL token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    // const resetPasswordToken = req.params.body

    const user = await User.findOne({
        resetPasswordToken,
        resetTokenExpiration: {$gt: Date.now()}
        
    })

    if(!user) {
        return next(new ErrorHandler('Invalid token or token expired',400));
    }

    if(req.body.password !== req.body.confirmpassword){
        return next(new ErrorHandler('Passwords do not match',400));
    }

    // Setup new password
    user.password = req.body.password
    
    user.resetPasswordToken = undefined
    user.resetTokenExpiration = undefined

    await user.save()

    sendToken(user,200,res)
})

// Get the current user login details => /api/v1/me
exports.getUserProfile = catchAsyncErrors(async (req,res,next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success:true,
        user
    })

})

// Update / change passsword => /api/v1/password/update
exports.updatePassword = catchAsyncErrors(async (req,res,next) => {
    const user = await User.findById(req.user.id).select('+password');;

    // Check previous user password
    const isMatched = await user.comparePassword(req.body.oldpassword);
    
    if (!isMatched) {
        return next(new ErrorHandler('OLD Password not correct',401));
    }

    user.password = req.body.password;
    await user.save();

    sendToken(user, 200, res);


})

// update user profile => /api/v1/me/update
exports.updateProfile = catchAsyncErrors(async (req, res,next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }    

    //update avatar: TODO
    if(req.body.avatar !== ''){
        const user = await User.findById(req.user.id)
        const image_id = user.avatar.public_id;
        if(image_id !== 'default_avatar'){
            const res = await cloudinary.v2.uploader.destroy(image_id)
        }
        // Upload image to Cloudinary
        const avatarResult = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'avatars',
            width: 150,
            crop: 'scale'
        });

        newUserData.avatar = {
            public_id: avatarResult.public_id,
            url: avatarResult.secure_url
        }
    }
    const user = await User.findByIdAndUpdate(req.user.id,newUserData ,{
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        
    })



});


//logout user => api/v1/logout
exports.logoutUser = catchAsyncErrors( async(req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({success: true, message: 'Logged out successfully'})
})

// Admin Routs
//GET ALL USERs => /api/v1/admin/users
exports.allUsers = catchAsyncErrors(async(req, res ,next) =>  {
     const users = await User.find();

     res.json({
        success: true,
        users
    })
})
//Get user detail => /api/v1/admin/user/:id
exports.getUserDetail = catchAsyncErrors(async(req, res,next) => {
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not fount with id: ${req.params.id}`,404));
    }
    res.json({
        success: true,
        user
    })
})


// update user profile => /api/v1/admin/user/:id
exports.updateUser = catchAsyncErrors(async (req, res,next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role:req.body.role
    }    

    //update avatar: TODO
    const user = await User.findByIdAndUpdate(req.params.id,newUserData ,{
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        
    })



});

//deleteUser => /api/v1/admin/user/:id
exports.deleteUser = catchAsyncErrors(async(req, res,next) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not fount with id: ${req.params.id}`,404));
    }

    // Remove avatar from cloudinary -TODO

    res.json({
        success: true,
        user
    })
})