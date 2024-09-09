import React, { Fragment} from 'react';
import { useNavigate } from 'react-router-dom';
import './cart.css';
import MetaData from '../layout/MetaData';
import { useSelector } from 'react-redux';
import CheckoutSteps from './CheckoutSteps';

const ConfirmOrder = () => {

    const { cartItems,shippingInfo } = useSelector(state => state.cart);
    const {user} = useSelector(state => state.auth);
    const navigate = useNavigate();

    //calcule prix
    const itemsPrice = cartItems.reduce((acc,item) => acc + item.price * item.quantity,0)
    const shippingPrice = shippingInfo.city === "16-ALGER" ? 400 : 800
    const taxPrice = 0
    // const taxPrice = Number((0.05*itemsPrice).toFixed(2))
    const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2)

    const processToPaiment = () => {
        const data = {
            itemsPrice:itemsPrice.toFixed(2),
            shippingPrice,
            taxPrice,
            totalPrice
        }
        sessionStorage.setItem('orderInfo',JSON.stringify(data))
        navigate('/order/paiment');
    }

  return (
    <Fragment>
        <MetaData title="Confirm Order" />
        <CheckoutSteps shipping confirmOrder/>
            <Fragment>
                <div className='cart-items-container'>
                    <div className='cart-item-list'>
                                <hr />
                                <div className='cart-item'>
                                    <h2>Shipping info</h2>
                                    <div className='shipping_info'>
                                        <div className='d-flex'>
                                            <h4 style={{ width: '100px' }}>Name :</h4>
                                            <h4>{user.name}</h4>
                                        </div>
                                        <div className='d-flex'>
                                            <h4 style={{ width: '100px' }}>Phone :</h4>
                                            <h4>{shippingInfo.phoneNo}</h4>
                                        </div>
                                        <div className='d-flex'>
                                            <h4 style={{ width: '100px' }}>Willaya :</h4>
                                            <h4>{shippingInfo.city}</h4>
                                        </div>
                                        <div className='d-flex'>
                                            <h4 style={{ width: '100px' }}>Address :</h4>
                                            <h4>{shippingInfo.address}</h4>
                                        </div>
                                    </div>
                                    <h2>Your Cart Items:</h2>
                                    {cartItems.map(item => (
                                        <Fragment key={item.product}>
                                            <hr className='spacewhite'/>
                                            <div className='shipping-item'>
                                                <div className='shipping-row'>
                                                    <div className='shipping-item-image'>
                                                        <img src={item.image} alt={item.name} className='img-fluid'  />
                                                    </div>
                                                    
                                                    <div className='shipping-item-name'>
                                                        <h4 className='shipping-item-price'>{item.name} </h4>
                                                    </div>
                                                    <div className='shipping-item-price'>
                                                        <h4 className='shipping-item-price'>{item.quantity} x {item.price} DA = {item.price*item.quantity}</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </Fragment>
                                    ))}
                                </div>
                    </div>
                    <div className='cart-total'>
                        <h2>Order Summary</h2>
                        <div className='p-inside'>
                            <p>Sub total:</p>
                            <p>{itemsPrice} DA</p>
                        </div>
                        <div className='p-inside'>
                            <p>Shipping:</p>
                            <p>{shippingPrice} DA</p>
                        </div>
                        <hr/>
                        <div className='p-inside'>
                            <p>Total:</p>
                            <p>{totalPrice} DA</p>
                        </div>
                        <button onClick={processToPaiment} className='checkout-btn'>Proceed to Checkout</button>
                    </div>
                </div>
            </Fragment>
    </Fragment>
  )
}

export default ConfirmOrder