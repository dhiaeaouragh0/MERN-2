import axios from "axios";

import {
    CREATE_ORDER_REQUEST ,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../constants/orderConstants'
import { CLEAR_CART } from '../constants/cartConstants';

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: CREATE_ORDER_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        };

        console.log("Sending order data:", order);

        const { data } = await axios.post('/api/v1/order/new', order, config);

        console.log("Order creation successful:", data);

        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data.order
        });
        const cartItems= []

        // Vider le panier après la création réussie de la commande
        dispatch({ type: CLEAR_CART });  // Vide le panier dans Redux
        localStorage.setItem('cartItems', JSON.stringify(cartItems));  // Vide le panier dans le localStorage

    } catch (error) {
        console.error("Order creation failed:", error.response?.data?.message || error.message);

        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response?.data?.message || error.message
        });
    }
};
// Get my orders
export const myOrder = () => async (dispatch) => {
    try {
        dispatch({ type: MY_ORDERS_REQUEST });

        const { data } = await axios.get('/api/v1/orders/me');
        dispatch({
            type: MY_ORDERS_SUCCESS,
            payload: data.orders
        });
        
    } catch (error) {
        console.error("My orders retrieval failed:", error.response?.data?.message || error.message);
        dispatch({
            type: MY_ORDERS_FAIL,
            payload: error.response?.data?.message || error.message
        });
    }
}

export const getOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/v1/order/${id}`);
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data.order
        });
        
    } catch (error) {
        console.error("My orders retrieval failed:", error.response?.data?.message || error.message);
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response?.data?.message || error.message
        });
    }
}


//Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}