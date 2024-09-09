import React from 'react'
import { Link } from 'react-router-dom'
import './cart.css';

const CheckoutSteps = ({shipping,confirmOrder,payment}) => {
  return (
    <div className='checkout-progress d-flex justify-content-center mt-2 mb-5'>
        {shipping ? <div id='left-bare'><Link to={"/shipping"} >
            <div className='triangle2-active'></div>
            <div className='step active-step'>Shipping</div>
            <div className='triangle-active'></div>
        </Link></div> : <div id='left-bare'><Link to={"#!"} disabled>
            <div className='triangle2-incomplete'></div>
            <div className='step incomplete'>Shipping</div>
            <div className='triangle-incomplete'></div>
        </Link></div>}

        {confirmOrder ? <Link to={"/order/confirm"} className='float-right'>
            <div className='triangle2-active'></div>
            <div className='step active-step'>Confirm Order</div>
            <div className='triangle-active'></div>
        </Link> : <Link to={"#!"} disabled>
            <div className='triangle2-incomplete'></div>
            <div className='step incomplete'>Confirm Order</div>
            <div className='triangle-incomplete'></div>
        </Link>}

        {payment ? <div id='right-bare'><Link to={"/order/paiment"} className='float-right'>
            <div className='triangle2-active'></div>
            <div className='step active-step'>Payment</div>
            <div className='triangle-active'></div>
        </Link> </div>:<div id='right-bare'> <Link to={"#!"} disabled>
            <div className='triangle2-incomplete'></div>
            <div className='step incomplete'>Payment</div>
            <div className='triangle-incomplete'></div>
        </Link></div>}

    </div>
  )
}

export default CheckoutSteps