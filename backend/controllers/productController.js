const Product = require('../models/product')

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncError');
const APIFeatures = require('../utils/apiFeatures');

//Create new product => /api/vi/admin/product/new
exports.newProduct = catchAsyncErrors(async (req,res,next) => {

    req.body.user = req.user.id;

    const product = await Product.create(req.body)
    
        res.status(201).json({
            success: true,
            product
        })
})

//Get all products => /api/vi/products
exports.getProducts = catchAsyncErrors(async (req,res,next) => {

    // return next(new ErrorHandler('My test error',400))
    const resPerPage = 4;
    const productCount = await Product.countDocuments();

    const apiFeatures = new APIFeatures(Product.find(),req.query) 
                        .search()
                        .filter()
                        .pagination(resPerPage)

    const products = await apiFeatures.query;

    res.status(200).json({
        succes:true,
        productCount,
        products,
        resPerPage
    })
})

//get all products (Admin) => /api/v1/admin/products
exports.getAdminProducts = catchAsyncErrors(async (req,res,next) => {

    const products = await Product.find();

    res.status(200).json({
        succes:true,
        products,
    })
})


//Get single product => /api/vi/products/:id
exports.getSingleProduct = catchAsyncErrors(async (req,res,next) => {

    const product = await Product.findById(req.params.id)
        .populate('user','name')  


    if (!product){
        return next(new ErrorHandler("Product not found",404));
    }
    res.status(200).json({
        succes:true,
        product
    })

})

//Update product => /api/vi/admin/products/:id
exports.updateProduct = catchAsyncErrors(async (req,res,next) => {
    let product = await Product.findById(req.params.id)
    if (!product){
        return res.status(404).json({success:false, message: 'Product not found'})
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success:true,
        message: 'Product Updated successfully',
        product
    })
})

//Delete product => /api/vi/admin/products/:id

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
})

// Create a new review => /api/v1/review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    };

    const product = await Product.findById(productId);
    if (!product) {
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        });
    }

    if (!product.reviews) {
        product.reviews = [];
    }

    const isReviewed = product.reviews.find(
        r => r.user && r.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
        product.reviews.forEach(review => {
            if (review.user && review.user.toString() === req.user._id.toString()) {
                review.rating = rating;
                review.comment = comment;
            }
        });
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(201).json({
        success: true,
        message: 'Review added successfully',
    });
});

// Get all reviews for a product => /api/v1/reviews/:id

exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        });
    }

    res.status(200).json({
        success: true,
        count: product.reviews.length,
        reviews: product.reviews
    });
});

// Delete a review => /api/v1/reviews/:id

exports.deleteProductReview = catchAsyncErrors(async (req, res, next) => {

    const { productId, id } = req.query;
    
    const product = await Product.findById(productId);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        });
    }
    

    
    const reviews = product.reviews.filter(review => review._id.toString() !== id);

    const numOfReviews = reviews.length;

    const ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) /reviews.length;

    await Product.findByIdAndUpdate(req.query.productId,{
        reviews,
        numOfReviews,
        ratings
    },{
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,

    });


});