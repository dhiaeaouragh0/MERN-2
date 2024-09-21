const express = require('express');
const router = express.Router();

const { getProducts , newProduct ,getSingleProduct ,updateProduct,
    deleteProduct,createProductReview,getProductReviews,deleteProductReview
,getAdminProducts} = require('../controllers/productController');


const { isAuthenticatedUser , authorizeRoles} = require('../middlewares/auth');

router.route('/products').get(getProducts);
router.route('/admin/products').get(getAdminProducts);
router.route('/product/:id').get(getSingleProduct);

router.route('/admin/products/new').post(isAuthenticatedUser,authorizeRoles('admin'),newProduct);
router.route('/admin/product/:id')
                    .put(isAuthenticatedUser,authorizeRoles('admin'),updateProduct)
                    .delete(isAuthenticatedUser,authorizeRoles('admin'),deleteProduct);

router.route('/review').put(isAuthenticatedUser, createProductReview);
router.route('/reviews').get(getProductReviews);
router.route('/reviews').delete(isAuthenticatedUser,deleteProductReview);



module.exports = router;