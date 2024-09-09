const Order = require('../models/order')
const Product = require('../models/product')

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncError');
const APIFeatures = require('../utils/apiFeatures');

//Create new order => /api/v1/order/new
exports.newOrder = catchAsyncErrors( async(req,res,next) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo

    } = req.body;

    const order = await Order.create({
        user: req.user._id,
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paitAt:Date.now()
    })

    res.status(200).json({
        success: true,
        order
    })
})

// Get single order => /api/v1/order/:id
exports.getSingleOrder = catchAsyncErrors(async(req,res,next) => {
    const order = await Order.findById(req.params.id).populate('user','name email')
    
    if (!order){
        return next(new ErrorHandler("Order not found",404));
    }



    res.status(200).json({
        success: true,
        order
    })
})

// Get logged in user orders => /api/v1/orders/me
exports.myOrder = catchAsyncErrors(async(req,res,next) => {
    const orders = await Order.find({user: req.user.id})
    
    if (!orders){
        return next(new ErrorHandler("Order not found",404));
    }

    res.status(200).json({
        success: true,
        orders
    })
})

// Get all orders => /api/v1/admin/orders
exports.AllOrder = catchAsyncErrors(async(req,res,next) => {
    const orders = await Order.find()   

    if (!orders){
        return next(new ErrorHandler("Order not found",404));
    }

    let totalAmount = 0;

    orders.forEach(order => {
        totalAmount += order.totalPrice;
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
})

// Update / process orders => /api/v1/admin/order/:id
exports.updateOrder = catchAsyncErrors(async(req,res,next) => {
    const order = await Order.findById(req.params.id)   

    if (!order){
        return next(new ErrorHandler("Order not found",404));
    }

    if (order.orderStatus === 'Delivered'){
        return next(new ErrorHandler("YOu have already deliveres this order",404));
    }

    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity)
    })

    order.orderStatus = req.body.status,
    order.delivredAt = Date.now()

    await order.save();

    res.status(200).json({
        success: true,
        order
    })
})

async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    product.stock = product.stock - quantity;

    await product.save({validateBeforeSave:false});
}

// Delete / process orders => /api/v1/admin/order/:id
exports.deleteOrder = catchAsyncErrors(async(req,res,next) => {
    const order = await Order.findByIdAndDelete(req.params.id)   

    if (!order){
        return next(new ErrorHandler("Order not found",404));
    }

    res.status(200).json({
        success: true,
        order
    })
})

// 