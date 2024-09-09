import React, { useEffect, useState, Fragment } from 'react';
import {  useNavigate } from 'react-router-dom';
import './user.css';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import default_avatar from '../../assets/default_avatar.jpg';
import { updateProfile,loadUser, clearErrors } from '../../actions/userActions';
import {UPDATE_USER_RESET} from '../../constants/userConstants';

const UpdateProfile = () => {


    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState(default_avatar);


    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {  user  } = useSelector(state => state.auth);
    const {error,isUpdated,loading } = useSelector(state => state.user);

    useEffect(() => {

        if(user){
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
        }
    
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    
        if(isUpdated){
            alert.success('Profile updated successfully.');
            dispatch(loadUser());
            navigate('/me');
            dispatch({
                type: UPDATE_USER_RESET
            })
        }
    }, [dispatch, alert, error, navigate, isUpdated, user]);
    

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email); 
        formData.set('avatar', avatar);

        dispatch(updateProfile(formData));
    };

    const onChange = e => {
        
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
        
    };
  return (
    <Fragment>
        {loading ? <Loader /> : (
            <Fragment>
                <MetaData title="Update Profile" />
                    <div className="backg">
                        <div className="left-panel form-login-container login-container">
                            <form onSubmit={submitHandler} >
                                <h1 className='showing2' id='updateProfile'>Update Profile</h1>
                                    <div className='form-group'>
                                        <div >
                                            <figure className='avatar'>
                                                <label htmlFor='customFile'>
                                                    <img
                                                        src={avatarPreview}
                                                        className='rounded-circle'
                                                        alt='avatar preview'
                                                        style={{ cursor: 'pointer' }}
                                                    />
                                                </label>
                                            </figure>
                                        </div>
                                        <div className=''>
                                            <input
                                                type='file'
                                                name='avatar'
                                                className=''
                                                id='customFile'
                                                accept='image/*'
                                                onChange={onChange}
                                                style={{ display: 'none' }}
                                            />
                                        </div>
                                    </div>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                <button disabled={loading ? true : false} type="submit">Update Profile</button>
                            </form>
                        </div>
                        <div className="right-panel">
                            <h3>Update Your Profile</h3>
                            <h4>Keep your information up to date</h4>
                        </div>
                    </div>
            </Fragment>
        )}
    

    
   
</Fragment>

  )
}

export default UpdateProfile