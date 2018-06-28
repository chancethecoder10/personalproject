import axios from 'axios'

const initialState = {
    products: [],
    user: {},
    shoppingCart: [],
    total: 0,
}

const GET_USER_DATA = 'GET_USER_DATA'
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const ADD_TO_SHOPPING_CART = 'ADD_TO_SHOPPING_CART'
const REMOVE_FROM_SHOPPING_CART = 'REMOVE_FROM_SHOPPING_CART'
const CLEAR_CART = 'CLEAR_CART'






export default function reducer( state = initialState, action) {
    switch(action.type){
        case GET_USER_DATA + '_FULFILLED':
        return Object.assign({}, state, {user: action.payload})
        
        case GET_ALL_PRODUCTS + '_FULFILLED':
        return Object.assign({}, state, {products: action.payload})

        case ADD_TO_SHOPPING_CART:
        return {
            ...state,
            shoppingCart: [...state.shoppingCart, action.payload],
            total: state.total += +action.price
        }

        case REMOVE_FROM_SHOPPING_CART:
        return {
            ...state,
            shoppingCart: state.shoppingCart.filter((product) => action.payload !== product),
            total: state.total -= +action.price
        }

        case CLEAR_CART:
        return{
            ...state,
            shoppingCart: [],
            total: 0
        }

        default:
            return state;
    }
}


export function getUser() {
    let userData = axios.get('/auth/user').then(res => res.data)
    return {
        type: GET_USER_DATA,
        payload: userData
    }
}

export function getProducts(){
    const allProducts = axios.get('/api/products').then(res => res.data)
    
    return {
        type: GET_ALL_PRODUCTS,
        payload: allProducts
    }
}

export function addToShoppingCart(product){
    return {
        type: ADD_TO_SHOPPING_CART,
        payload: product,
        price: product.price
    }
}

export function removeFromShoppingCart(productIndex){
    return {
        type: REMOVE_FROM_SHOPPING_CART,
        payload: productIndex,
        price: productIndex.price
    }
}

export function clearCart(){
    return {
        type: CLEAR_CART,
    }
}