import React, { useEffect, useState, Fragment } from 'react';
import './user.css';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, clearErrors } from '../../actions/userActions';

const ForgotPassword = () => {

    
    const [email, setEmail] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();

    const { error,loading, message } = useSelector(state => state.forgotPassword);

    useEffect(() => {
        
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (message) {
            alert.success(message);
        }
    }, [dispatch, alert,message, error]);

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('email', email);


        dispatch(forgotPassword(formData));
    };

  return (

    <Fragment>
        {loading ? <Loader /> : (
            <Fragment>
                <MetaData title="Forgot Password" />
                <div className="backg">
                    <div className="left-panel form-login-container login-container">
                        <form onSubmit={submitHandler}>
                            <h1 className='showing2' id='updatePassword'>Forgot Password</h1>
                            <input
                                type="email"
                                id="email_field"
                                placeholder='Enter Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            
                            <button disabled={loading ? true : false} type="submit">Send Email</button>
                        </form>
                    </div>
                    <div className="right-panel">
                        <h3>Reset Your Password</h3>
                        {/* <h4>Ensure your password is always up to date.</h4> */}
                    </div>
                </div>
            </Fragment>
        )}
    </Fragment>
  )
}

export default ForgotPassword