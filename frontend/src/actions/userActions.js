import axios from 'axios';
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    NEW_PASSWORD_REQUEST,
    NEW_PASSWORD_SUCCESS,
    NEW_PASSWORD_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    CLEAR_ERRORS
} from '../constants/userConstants'

// Login user

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const { data } = await axios.post('/api/v1/login', { email, password }, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user
        });

        localStorage.setItem('token', data.token);
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        });
    }
};

// Register user

export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };

        const { data } = await axios.post('/api/v1/register', userData, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: data.user
        });

    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message;
        dispatch({
            type: REGISTER_FAIL,
            payload: errorMessage
        });
    }
};
// Load user

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });


        const { data } = await axios.get('/api/v1/me');

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user
        });

    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message;
        dispatch({
            type: LOAD_USER_FAIL,
            payload: errorMessage
        });
    }
};

// Update user

export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_USER_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };

        const { data } = await axios.put('/api/v1/me/update', userData, config);

        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: data.success
        });

    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message;
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: errorMessage
        });
    }
};

//update password
export const updatePassword = (passwords) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const { data } = await axios.put('/api/v1/password/update', passwords, config);

        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data.success
        });

    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message;
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: errorMessage
        });
    }
};

//forgot password
export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const { data } = await axios.post('/api/v1/password/forgot', email, config);

        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data.message
        });

    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message;
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: errorMessage
        });
    }
};

//Reset password
export const newPassword = (token,password) => async (dispatch) => {
    try {
        dispatch({ type: NEW_PASSWORD_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const { data } = await axios.put(`/api/v1/password/reset/${token}`, password, config);

        dispatch({
            type: NEW_PASSWORD_SUCCESS,
            payload: data.success
        });

    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message;
        dispatch({
            type: NEW_PASSWORD_FAIL,
            payload: errorMessage
        });
    }
};




//logout user
export const logout = () => async (dispatch) => {
    try {

        await axios.post('/api/v1/logout');

        dispatch({
            type: LOGOUT_SUCCESS,
        });

    } catch (error) {
        
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message
        });
    }
};






// Clear errors
export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
