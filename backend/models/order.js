const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
    shippingInfo:{
        address: {
            type:String,
            required: true
        },
        city: {
            type:String,
            required: true
        },
        phoneNo: {
            type:String,
            required: true
        },
        postalCode: {
            type:String
        },
        country: {
            type:String,
            required: true
        },
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderItems:[
        {
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            name:{
                type: String,
                required: true
            },
            quantity:{
                type: Number,
                required: true
            },
            image:{
                type: String,
                required: true
            },
            price:{
                type: Number,
                required: true
            }
            
        }
    ],
    paymentInfo:{
        id:{
            type:String
        },
        status:{
            type: String
        },
    },
    paidAt: {  // Correction here
        type: Date
    },
    itemsPrice:{
        type: Number,
        required: true,
        default: 0.0
    },
    taxPrice:{
        type: Number,
        required: true,
        default: 0.0
    },
    shippingPrice:{
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice:{
        type: Number,
        required: true,
        default: 0.0
    },
    orderStatus:{
        type: String,
        required: true,
        default: 'processing'
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    delivredAt:{
        type: Date
    }

})

module.exports = mongoose.model('Order', orderSchema);