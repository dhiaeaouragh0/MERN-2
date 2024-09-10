const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please enter product name'],
        trim: true,
        maxLength: [100,'product name cannot exceed 100 characters'],
        unique: true
    },
    price: {
        type: Number,
        required: [true,'Please enter product price'],
        maxLength: [5,'product price cannot exceed 5 characters'],
        default: 0.0
    },
    description: {
        type: String,
        required: [true,'Please enter product description'],
    },
    rating: {
        type: Number,
        required: [true,'Please enter product rating'],
        default: 0
    },
    images: [
        {
            public_id:{
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        ref: 'Category',
        required: [true,'Please enter product category'],
        enum: {
            values: ['Electronics', 'Clothing', 'Books', 'Toys','Sports', 'Home', 'Other'],
            message: 'Please select a valid category'
        }
    },
    stock: {
        type: Number,
        required: [true,'PLease enter product stock'],
        maxLength: [5,'mhm'],
        default: 0
    },
    seller: {
        type: String,
        required: [true,'PLease enter product seller']
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            name:{
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required: true,
                maxLength: [500,'Review comment cannot exceed 500 characters']
            }
        }
    ],
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }


});

module.exports = mongoose.model('Product', productSchema);