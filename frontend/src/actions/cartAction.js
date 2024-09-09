import axios from 'axios';
import { 
    ADD_TO_CART,
    REMOVE_ITEM_CART,
    SAVE_SHIPPING_INFO
 } from '../constants/cartConstants';

export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(`/api/v1/product/${id}`);
        dispatch({
            type: ADD_TO_CART,
            payload: {
                product: data.product._id,
                name: data.product.name,
                image: data.product.images[0].url,  
                price: data.product.price,
                stock: data.product.stock,
                quantity   
            }
        });

        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    } catch (error) {
        console.error('Error adding item to cart:', error);
    }
}


export const removeItemFromCart = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: REMOVE_ITEM_CART,
            payload: id
        });

        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    } catch (error) {
        console.error('Error adding item to cart:', error);
    }
}

export const saveShippingInfo = (data) => async (dispatch) => {
    try {
        console.log("Saving shipping info:", data); // Log pour vérifier les données
        dispatch({
            type: SAVE_SHIPPING_INFO,
            payload: data
        });

        localStorage.setItem('shippingInfo', JSON.stringify(data));
    } catch (error) {
        console.error("Error saving shipping info to localStorage:", error);
    }
}

