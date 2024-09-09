import React, { useEffect, useState, Fragment } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './user.css';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import default_avatar from '../../assets/default_avatar.jpg';
import { login, register, clearErrors } from '../../actions/userActions';

const Login = () => {
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    });

    const { name, email, password } = user;
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState(default_avatar);

    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation(); // Utilisez useLocation pour obtenir location

    const { isAuthenticated, error, loading } = useSelector(state => state.auth);

    // Utilisez location.search pour obtenir la chaîne de requête
    const redirect = new URLSearchParams(location.search).get('redirect') || '/';

    useEffect(() => {
        if (isAuthenticated) {
            navigate(redirect);
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, isAuthenticated, error, redirect, navigate]);

    const submitHandlerLogin = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword));
    };

    const submitHandlerRegister = (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('password', password);
        formData.set('avatar', avatar);
    
        dispatch(register(formData));
    };
    

    const onChange = e => {
        if (e.target.name === 'avatar') {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                    console.log(avatar);
                    console.log(avatarPreview);
                }
            };

            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    useEffect(() => {
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('login-container');

        if (signUpButton && signInButton && container) {
            const handleSignUp = () => container.classList.add('right-panel-active');
            const handleSignIn = () => container.classList.remove('right-panel-active');

            signUpButton.addEventListener('click', handleSignUp);
            signInButton.addEventListener('click', handleSignIn);

            return () => {
                signUpButton.removeEventListener('click', handleSignUp);
                signInButton.removeEventListener('click', handleSignIn);
            };
        }
    }, []);

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title='Login' />

                    <div className='full-page-login'>
                        <div className='login-container' id='login-container'>
                            <div className='form-login-container sign-up-login-container'>
                                <form onSubmit={submitHandlerRegister}>
                                    <h1 className='showing2' id='createAccont'>Create Account</h1>

                                    <input
                                        type='text'
                                        placeholder='Name'
                                        name='name'
                                        value={name}
                                        onChange={onChange}
                                    />
                                    <input
                                        type='email'
                                        placeholder='Email'
                                        name='email'
                                        value={email}
                                        onChange={onChange}
                                    />
                                    <input
                                        type='password'
                                        placeholder='Password'
                                        name='password'
                                        value={password}
                                        onChange={onChange}
                                    />
                                    <div className='form-group'>
                                        <div className='d-flex align-items-center'>
                                            <div>
                                                <figure className='avatar mr-3 item-rtl'>
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
                                            <div className='custom-file'>
                                                <input
                                                    type='file'
                                                    name='avatar'
                                                    className='custom-file-input'
                                                    id='customFile'
                                                    accept='image/*'
                                                    onChange={onChange}
                                                    style={{ display: 'none' }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <button id='singupbtn' type='submit' disabled={loading}>
                                        Sign Up
                                    </button>
                                </form>
                            </div>
                            <div className='form-login-container sign-in-login-container'>
                                <form onSubmit={submitHandlerLogin}>
                                    <h1 className='showing2'>Sign in</h1>

                                    <input
                                        type='email'
                                        placeholder='Email'
                                        id='email_field'
                                        className='form-control'
                                        value={loginEmail}
                                        onChange={(e) => setLoginEmail(e.target.value)}
                                    />

                                    <input
                                        type='password'
                                        id='password_field'
                                        className='form-control'
                                        placeholder='Password'
                                        value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                    />
                                    <Link to='/password/forgot'>Forgot your password?</Link>
                                    <button>Sign In</button>
                                </form>
                            </div>
                            <div className='overlay-login-container'>
                                <div className='overlay'>
                                    <div className='overlay-panel overlay-left'>
                                        <h1 className='showing1'>Welcome Back!</h1>
                                        <p>To keep connected with us please login with your personal info</p>
                                        <button className='ghost' id='signIn'>Sign In</button>
                                    </div>
                                    <div className='overlay-panel overlay-right'>
                                        <h1 className='showing1'>Hello, Friend!</h1>
                                        <p>Enter your personal details and start your journey with us</p>
                                        <button className='ghost' id='signUp'>Sign Up</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Login;
