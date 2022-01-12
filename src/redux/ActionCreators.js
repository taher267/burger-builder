import axios from 'axios';
import { BaseUrl } from '../Components/BaseUrl';
import * as ActionTypes from './ActionTypes';
export const addIngredent = ltype => ({
    type: ActionTypes.ADD_INGREDENT,
    payload: ltype
});

export const removeIngredent = ltype => ({
    type: ActionTypes.REMOVE_INGREDENT,
    payload: ltype
});

export const updatePurchasable = () => ({
    type: ActionTypes.UPDATE_PURCHASABLE
});

export const resetIngedent = () => ({
    type: ActionTypes.RESET_INGREDENT
})


const loadOrders = orders => ({
    type: ActionTypes.LOAD_ORDER,
    payload: orders
});


const orderLoadFailed = () => ({
    type: ActionTypes.LOAD_ORDER_FAILED
});

export const fetchOrders = () => dispatch => {
    axios.get(BaseUrl + "orders.json")
        .then(res => res.data)
        .then(order => dispatch(loadOrders(order)))
        .catch(err => dispatch(orderLoadFailed()))


}

