import React, { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './order.css';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import { useSelector, useDispatch } from 'react-redux';
import { getOrderDetails, clearErrors } from '../../actions/orderAction';
import { useAlert } from 'react-alert';

const OrderDetails = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { id } = useParams();

    const { loading, error, order } = useSelector((state) => state.orderDetails);
    const { shippingInfo, orderItems, user, totalPrice, orderStatus } = order || {};

    useEffect(() => {
        dispatch(getOrderDetails(id));

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, error, id]);

    const shippingDetails = shippingInfo
        ? `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`
        : '';

    return (
        <Fragment>
            <MetaData title={`Order Details - ${id}`} />
            {loading ? (
                <Loader />
            ) : (
                <div className="order-body">
                    <div className="ordersD cart-item-list">
                        <hr />
                        <div className="cart-item">
                            <h2>Order Details </h2>
                            <div className="shipping_info">
                                <div className="d-flex">
                                    <h4 style={{ width: '100px' }}>order ID</h4>
                                    <h4>: {id}</h4>
                                </div>
                                <div className="d-flex">
                                    <h4 style={{ width: '100px' }}>Name</h4>
                                    <h4>: {user && user.name}</h4>
                                </div>
                                <div className="d-flex">
                                    <h4 style={{ width: '100px' }}>Phone</h4>
                                    <h4>: {shippingInfo && shippingInfo.phoneNo}</h4>
                                </div>
                                <div className="d-flex">
                                    <h4 style={{ width: '100px' }}>Shipping</h4>
                                    <h4>: {shippingDetails && shippingDetails}</h4>
                                </div>
                                <hr className='hr-white ml-1 test-width mt-2' />
                                <div className="d-flex ml-2 test-width">
                                    <h4 style={{ width: '100px' }}>Amount</h4>
                                    <h4>: {totalPrice} DA</h4>
                                </div>
                                <hr className='hr-white ml-1 test-width mb-2' />
                            </div>
                            <h2>Order Status :</h2>
                              <div className="shipping_info">
                                <div className="d-flex ml-2 test-width">
                                    <h4>{orderStatus}</h4>
                                </div>
                              </div>
                            <h2>Your Cart Items :</h2>
                            {orderItems &&
                                orderItems.map((item) => (
                                    <Fragment key={item.product}>
                                        <hr className="spacewhite" />
                                        <div className="shipping-item">
                                            <div className="shipping-row">
                                                <div className="shipping-item-image">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="img-fluid"
                                                    />
                                                </div>

                                                <div className="shipping-item-name">
                                                    <h4 className="shipping-item-price">{item.name}</h4>
                                                </div>
                                                <div className="shipping-item-price">
                                                    <h4 className="shipping-item-price">{item.price} (DA)</h4>
                                                </div>
                                                <div className="shipping-item-price">
                                                    <h4 className="shipping-item-price">
                                                        {item.quantity} Piece(s)
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>
                                    </Fragment>
                                ))}
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default OrderDetails;
