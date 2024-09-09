import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './cart.css';
import MetaData from '../layout/MetaData';
import { useSelector, useDispatch } from 'react-redux';
import { saveShippingInfo } from '../../actions/cartAction';
import cityList from './cityList';
import CheckoutSteps from './CheckoutSteps';

const Shipping = () => {
    const { shippingInfo } = useSelector(state => state.cart);
    console.log("Retrieved shippingInfo:", shippingInfo); 
    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
    const [postalCode, setPostalCode] = useState(shippingInfo.postalCode);
    const [country, setCountry] = useState("ALGERIA");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingInfo({ address, city, phoneNo, postalCode, country }));
        navigate('/order/confirm');
    };

    return (
        <Fragment>
            <MetaData title='Shipping Info' />
            <CheckoutSteps shipping />
            <Fragment>
                <div className="backg">
                    <div className="left-panel form-login-container login-container">
                        <form onSubmit={submitHandler} className='input_chaba'>
                            <h1 className='showing2' id='ShippingInfo'>Shipping Info</h1>
                            <input
                                id='country'
                                value="ALGERIA"
                                placeholder='ALGERIA'
                                onChange={(e) => setCountry(e.target.value)}
                                required
                                readonly={true}
                            >
                                
                            </input>
                            <select
                                id='city'
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            >
                                <option value='' disabled>Select a city</option>
                                {cityList.map(cityItem => (
                                    <option key={cityItem} value={cityItem}>
                                        {cityItem}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="text"
                                id="address"
                                placeholder='Address'
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                            <input
                                type='text'
                                placeholder='Phone Number'
                                id='phoneNo'
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                required
                            />
                            <input
                                type='text'
                                placeholder='Postal Code'
                                id='postalCode'
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                            />
                            

                            <button type="submit">Save Shipping Info</button>
                        </form>
                    </div>
                    <div className="right-panel">
                        <h3>Ensure Accurate Delivery</h3>
                        <h4>Double-check your shipping information to avoid delays.</h4>
                    </div>
                </div>
            </Fragment>
        </Fragment>
    );
};

export default Shipping;
