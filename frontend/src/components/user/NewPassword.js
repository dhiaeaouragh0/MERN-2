import React, { useEffect, useState, Fragment } from 'react';
import { useNavigate , useParams } from 'react-router-dom';
import './user.css';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { newPassword, clearErrors } from '../../actions/userActions';

const NewPassword = () => {

    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useParams();

    const { error,loading, success } = useSelector(state => state.forgotPassword);

    useEffect(() => {
        
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            alert.success('Password updated successfully');
            navigate('/login');
        }
    }, [dispatch, alert,success , error , navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('password', password);
        formData.set('confirmpassword', confirmpassword);

        dispatch(newPassword(token,formData));
    };

  return (
    <Fragment>
        {loading ? <Loader /> : (
            <Fragment>
                <MetaData title="New Password" />
                <div className="backg">
                    <div className="left-panel form-login-container login-container">
                        <form onSubmit={submitHandler}>
                            <h1 className='showing2' id='newpassword'>New Password</h1>
                            <input
                                type="password"
                                id="password_field"
                                placeholder='Enter Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                id="confirm_password_field"
                                placeholder='Confirm Password'
                                value={confirmpassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            
                            <button disabled={loading ? true : false} type="submit">Submit</button>
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

export default NewPassword