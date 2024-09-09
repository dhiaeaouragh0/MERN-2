const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,'Please enter your name'],
        unique: true,
        minlength: [5,'Your name must be at least 5 characters'],
        maxlength: [30,'Your name cannot exceed 30 characters']
    },
    email:{
        type: String,
        required: [true,'Please enter your email address'],
        unique: true,
        validate:[validator.isEmail,'Please enter a valid email address']
    },
    password:{
        type: String,
        required: [true,'Please enter your password'],
        minlength: [6,'Your password must be at least 6 characters'],
        select: false
    },
    avatar:{
            public_id:{
                type: String,
                default: 'default_avataree',
                require:false
            },
            url:{
                type: String,
                require:false,
            }
        },
    role:{
        type: String,
        default: 'user'
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetTokenExpiration: Date
})

// Encrypt password
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next()
    }

    this.password = await bcrypt.hash(this.password,10)
})

//Compare user password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

// Return JWT token
userSchema.methods.getJwtToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,
        {expiresIn:process.env.JWT_EXPIRES_TIME})
}

// generate password reset token
userSchema.methods.getResetPasswordToken = function() {
    //generate password reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    //hash and set resetPasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    //set token expire time
    this.resetTokenExpiration = Date.now() + 30 * 60 * 1000; // 10 minutes
    
    return resetToken;
}

module.exports = mongoose.model('User', userSchema);