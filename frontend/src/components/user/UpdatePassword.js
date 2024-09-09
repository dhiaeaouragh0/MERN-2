import React, { useEffect, useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import './user.css';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword, clearErrors } from '../../actions/userActions';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';

const UpdatePassword = () => {

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { error, isUpdated, loading } = useSelector(state => state.user);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success('Password updated successfully.');
            navigate('/me');
            dispatch({
                type: UPDATE_PASSWORD_RESET
            });
        }
    }, [dispatch, alert, error, navigate, isUpdated]);

    const submitHandler = (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            alert.error('Passwords do not match.');
            return;
        }

        const formData = new FormData();
        formData.set('oldpassword', oldPassword);
        formData.set('password', newPassword);

        dispatch(updatePassword(formData));
    };

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title="Update Password" />
                    <div className="backg">
                        <div className="left-panel form-login-container login-container">
                            <form onSubmit={submitHandler}>
                                <h1 className='showing2' id='updatePassword'>Update Password</h1>
                                <input
                                    type="password"
                                    id="old_password_field"
                                    placeholder='old_password'
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    required
                                />
                                <input
                                    type="password"
                                    id="new_password_field"
                                    placeholder='new_password'
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                                <input
                                    type="password"
                                    id="confirm_password_field"
                                    placeholder='confirm_password'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <button disabled={loading ? true : false} type="submit">Update Password</button>
                            </form>
                        </div>
                        <div className="right-panel">
                            <h3>Update Your Password</h3>
                            <h4>Ensure your password is always up to date.</h4>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
}

export default UpdatePassword;
