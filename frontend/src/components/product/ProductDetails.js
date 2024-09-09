import React, { useEffect, useState, Fragment } from 'react';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import { useAlert } from 'react-alert';
import { useParams,Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails, clearErrors } from '../../actions/productActions';
import Carousel from "./Carousel.jsx";
import { addItemToCart } from '../../actions/cartAction.js'
import NewReview from './NewReview.js';
import { NEW_REVIEW_RESET } from '../../constants/productConstants';


const ProductDetails = () => {
    const { id } = useParams();
    const alert = useAlert();
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);

    const { loading, error, product } = useSelector((state) => state.productDetails);
    const { user } = useSelector((state) => state.auth);
    const { error: reviewError, success } = useSelector((state) => state.newReview || {});

    useEffect(() => {
        dispatch(getProductDetails(id));

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (reviewError) {
            alert.error(reviewError);  
            dispatch(clearErrors());  
        }

        if (success) {
            alert.success('Review submitted successfully');  
            dispatch({ type: NEW_REVIEW_RESET });  
        }

    }, [dispatch, alert, error, id,reviewError,success]);

    const images = product && product.images ? product.images : [];
    const slides = images.map((image) => (
        <img 
            key={image.public_id} 
            src={image.url} 
            alt={product.name} 
            className='fixed-image'
        />
    ));

    

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <li key={i}>
                    <i className={`fa fa-star ${i <= rating ? 'checked' : ''}`}></i>
                </li>
            );
        }
        return stars;
    };
    const QuantitySelector = () => {
        
        const decreaseQuantity = () => {
            if (quantity > 1) {
                setQuantity(prevQuantity => prevQuantity - 1);
            }
        };
    
        const increaseQuantity = () => {
            if(quantity < product.stock) {
            setQuantity(prevQuantity => prevQuantity + 1);
            }else{
                alert.error('Out of stock');
            }
        };
    
        const handleInputChange = (e) => {
            const value = parseInt(e.target.value, 10);
            if (!isNaN(value) && value >= 1) {
                if(value<=product.stock) {
                    setQuantity(value);
                }else{
                    alert.error('Out of stock');
                }
            }
        };
    
        return (
            <div className="quantity-container">
                <div className="quantity-control">
                    <span className="btn-decrease" onClick={decreaseQuantity}>-</span>
                    <input 
                        type="number" 
                        className="quantity-input" 
                        value={quantity} 
                        onChange={handleInputChange} 
                    />
                    <span className="btn-increase" onClick={increaseQuantity}>+</span>
                </div>
                <div className="button-wrapper">
                    <button disabled={product.stock === 0} onClick={addToCart} type="button" id="cart-btn" className="btn quantity-submit">Add to Cart</button>
                </div>
            </div>
        ); 
    };
    const addToCart = () => {
        dispatch(addItemToCart(id, quantity));
        alert.success('Product added to cart');
    }
    

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={product.name} />
                    <div className="full-product_details">
                        <div className="full-page">
                            <div className="images_details">
                                <Carousel autoSlide={false}>
                                    {slides.map((s) => s)}
                                </Carousel>
                            </div>

                            <div className="product_details">
                                <h3>{product.name}</h3>
                                <p id="product_id">Product #{product._id}</p>

                                <hr />
                                <div className='test-content'>
                                    <ul className="vertical-list">
                                        <li>{product.category}</li>
                                        <li>|</li>
                                        {renderStars(product.rating)}
                                        <li>|</li>
                                        <li>{product.rating ? Number.isInteger(product.rating) ? product.rating : product.rating.toFixed(1): 'N/A'}<span id="no_of_reviews">({product.numOfReviews} Reviews)</span></li>
                                    </ul>    
                                </div>
                               

                                <hr />

                                <p id="product_price">{product.price} DA</p>

                                <QuantitySelector />

                                <hr />

                                <p>
                                    Status: <span id="stock_status">{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
                                    {(user && (user.role === 'admin' || (product.user && product.user._id === user._id))) && (
                                        <div className="stock-info">
                                            <p>Stock disponible: {product.stock}</p>
                                        </div>
                                    )}
                                </p>

                                <hr />

                                <h4 className="mt-2">Description:</h4>
                                <p>{product.description}</p>
                                <hr />
                                <p id="product_seller" className="mb-3">
                                    Sold by: <strong>{product && product.user ? product.user.name : product.seller}</strong>
                                </p>
                                {user ? <NewReview/>: 
                                    <Link to="/login"><div className="alert alert-warning">Login to post your review.</div></Link>
                                }
                                
                            </div>
                            
                        </div>
                        <div className='full_review'>
                            <div className='review_details'>
                                <h3 className='mt-4'>Reviews</h3>
                                {(!product.reviews || product.reviews.length === 0) ? (
                                    <p>No reviews yet.</p>
                                ) : (
                                    
                                    product.reviews.map((review) => (
                                        <div key={review._id} className="review-card">
                                            <hr className='hr-white mb-1'></hr>
                                            <p>{review.name}</p>
                                            <ul className='vertical-list'>
                                                {renderStars(review.rating)}
                                            </ul>
                                            <h5>{review.comment}</h5>
                                            {user && (user.role === 'admin' || (product.user && product.user._id === user._id)) && (
                                                <button className="btn btn-danger mb-1"><i className='fa fa-trash'></i></button>
                                                // <button onClick={() => dispatch(deleteReview(product._id, review._id))} className="btn btn-danger">Delete Review</button>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
}

export default ProductDetails;
