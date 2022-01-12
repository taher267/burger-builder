import { combineReducers } from "redux";
import * as ActionTypes from './ActionTypes';

const initState = {
    ingredents: [
        { type: "cheese", layer: 0 },
        { type: "meat", layer: 0 },
        { type: "salad", layer: 0 },
    ],

    orders: [],
    orderLoading: true,
    orderErr: false,

    totalPrice: 80,
    purchasable: false,

}
const initAuthState = {
    token: null,
    userId: null,
    authFail: null,
    authLoading: false,
}
const INGREDENT_PRICE = {
    salad: 20,
    cheese: 40,
    meat: 90
}

const ingredentReducer = (state = initState, action) => {
    let ingredents = [...state.ingredents];
    switch (action.type) {
        case ActionTypes.ADD_INGREDENT:
            for (let item of ingredents) {
                if (item.type === action.payload) {
                    item.layer++;
                }

            }
            return {
                ...state,
                ingredents: ingredents,
                totalPrice: state.totalPrice + INGREDENT_PRICE[action.payload]
            }
        case ActionTypes.REMOVE_INGREDENT:
            for (let item of ingredents) {
                if (item.type === action.payload) {
                    if (item.layer <= 0) return state;
                    item.layer--;
                }
            }
            return { ...state, ingredents: ingredents }
        case ActionTypes.UPDATE_PURCHASABLE:
            const sum = state.ingredents.reduce((sum, ele) => sum + ele.layer, 0);
            return { ...state, purchasable: sum > 0 }
        case ActionTypes.RESET_INGREDENT:
            return {
                ...state,
                ingredents: [
                    { type: "cheese", layer: 0 },
                    { type: "meat", layer: 0 },
                    { type: "salad", layer: 0 },
                ],
                totalPrice: 80,
                purchasable: false
            }
        case ActionTypes.LOAD_ORDER:
            let orders = [];
            for (let key in action.payload) {
                orders.push({
                    ...action.payload[key],
                    id: key
                });

            }

            return {
                ...state,
                orders: orders,
                orderLoading: false
            }
        case ActionTypes.LOAD_ORDER_FAILED:
            return { ...state, orderErr: true, orderLoading: false }

        default:
            return state;
    }
}
const AuthReducer = (state = initAuthState, action) => {
    switch (action.type) {
        case ActionTypes.AUTH_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                userId: action.payload.userId,
            }
        case ActionTypes.AUTH_FAILED:
            return {
                ...state,
                authFail: action.payload
            }
        case ActionTypes.AUTH_LOADING:
            return {
                ...state,
                authLoading: action.payload
            }
        case ActionTypes.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null,
                authFail: null,

            }
        default:
            return state;
    }
}

export const Reducer = combineReducers({
    builder: ingredentReducer,
    auth: AuthReducer
})