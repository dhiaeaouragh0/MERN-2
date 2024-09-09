import React, { Fragment } from 'react';
import { Link,useNavigate} from 'react-router-dom';
import './cart.css';
import MetaData from '../layout/MetaData';
import { useSelector, useDispatch } from 'react-redux';
import { addItemToCart ,removeItemFromCart} from '../../actions/cartAction';

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems } = useSelector(state => state.cart);
    const calculateTotalPrice = () => {
        return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
    };
    const calculateTotalQuantity = (cartItems) => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
    }
    const removeItemFromCartHandler = (id) =>{
        dispatch(removeItemFromCart(id));
    }
    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping');
    };
    

    return (
        <Fragment>
            <MetaData title='Shopping Cart' />
            {cartItems.length === 0 ? (
                <h2 className='cart-header'>Your Cart is Empty</h2>
            ) : (
                <Fragment>
                    <h2 className='cart-header'>Your Cart: <b>{cartItems.length} items</b></h2>
                    <div className='cart-items-container'>
                        
                        <div className='cart-item-list'>
                            {cartItems.map(item => (
                                <Fragment key={item.product}>
                                    <hr />
                                    <div className='cart-item'>
                                        <div className='row'>
                                            <div className='cart-item-image'>
                                                <img src={item.image} alt={item.name} className='img-fluid'  />
                                            </div>
                                            <div className='cart-item-name '>
                                                <Link to={`/product/${item.product}`} className='cart-item-link'>
                                                    <h3 className='cart-item-name'>{item.name}</h3>
                                                </Link>
                                            </div>
                                                <div className='cart-item-price '>
                                                    <h4 className='cart-item-price'>Price: {item.price} DA</h4>
                                                </div>
                                            <div className='quantity-controls'>
                                                    <button className='btn quantity-btn-decrease' onClick={() => dispatch(addItemToCart(item.product, item.quantity - 1))}><i className='fa fa-minus'></i></button>
                                                    <input type='number' value={item.quantity} readOnly className='quantity-input' />
                                                    <button className='btn quantity-btn-increase' onClick={() => dispatch(addItemToCart(item.product, item.quantity + 1))}><i className='fa fa-plus'></i></button>
                                            </div>
                                            <div className='cart-item-remove '>
                                                 <button className='btn btn-danger' onClick={() => removeItemFromCartHandler(item.product)}><i className='fa fa-trash'></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </Fragment>
                            ))}
                        </div>
                        <div className='cart-total'>
                            <h2>Order Summary</h2>
                            
                            <div className='p-inside'>
                                <p> Sub total:</p>
                                <p>{calculateTotalQuantity(cartItems)} (Units)</p>
                            </div>
                            <div className='p-inside'>
                                <p> Est total:</p>
                                <p>{calculateTotalPrice()} DA</p>
                            </div>
                            <hr/>
                            <button onClick={checkoutHandler} className='checkout-btn'>Proceed to Checkout</button>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Cart;
