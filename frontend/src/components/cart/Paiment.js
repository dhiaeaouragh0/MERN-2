import React, { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { createOrder } from '../../actions/orderAction';
import MetaData from '../layout/MetaData';
import CheckoutSteps from './CheckoutSteps';
import './cart.css';

const Payment = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { cartItems, shippingInfo } = useSelector(state => state.cart);
    // const { user } = useSelector(state => state.auth);

    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));

    const submitHandler = async (e) => {
        e.preventDefault();
    
        const orderData = {
            orderItems: cartItems,
            shippingInfo,
            itemsPrice: orderInfo.itemsPrice,
            taxPrice: orderInfo.taxPrice,
            shippingPrice: orderInfo.shippingPrice,
            totalPrice: orderInfo.totalPrice,
            paymentInfo: {
                status: "Cash on Delivery"
            }
        };
    
        console.log("Order Data:", orderData);
    
        try {
            document.querySelector('#confirm-payment').disabled = true;
            await dispatch(createOrder(orderData));
            navigate('/success');
        } catch (error) {
            document.querySelector('#confirm-payment').disabled = false;
            alert.error(error.response?.data?.message || "An error occurred");
        }
    };

    return (
        <Fragment>
            <MetaData title='Shipping Info' />
            <CheckoutSteps shipping confirmOrder payment />
            <Fragment>
                <div className="backg">
                    <div className="left-panel">
                        <div className='new-left-panel'>
                        <h4 className='info-title'>Veuillez attendre notre appel pour confirmer la commande. Vous paierez à la livraison.</h4>
                        <p className='info-text'>Please wait for our call to confirm the order. You will pay upon delivery.</p>
                        <h4 className='info-subtitle'>Votre commande sera expédiée à {shippingInfo.city}, {shippingInfo.address}.</h4>
                        <p className='info-text'>Your order will be shipped to {shippingInfo.city}, {shippingInfo.address}.</p>
                        </div>
                    </div>
                    <div className="right-panel form-login-container login-container">
                        <h1 className='showing2' id='PaymentInfo'>Payment on Delivery</h1>
                        <h3>Order Summary</h3>
                        <ul>
                            {cartItems.map(item => (
                                <li key={item.product}>
                                    {item.name} x {item.quantity} = {item.price * item.quantity} DA
                                </li>
                            ))}
                        </ul>
                        <h4>Total: {orderInfo.totalPrice} DA</h4>
                        <form onSubmit={submitHandler} id='videpls'>
                            <button 
                            type="submit"
                            id='confirm-payment'
                             >
                                Confirm </button>
                        </form>
                    </div>
                </div>
            </Fragment>
        </Fragment>
    );
};

export default Payment;
