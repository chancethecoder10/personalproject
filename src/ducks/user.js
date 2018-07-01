import axios from 'axios'

const initialState = {
    products: [],
    user: {},
    cart: []
}

const GET_USER_DATA = 'GET_USER_DATA'
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const ADD_TO_SHOPPING_CART = 'ADD_TO_SHOPPING_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const CLEAR_CART = 'CLEAR_CART'
const SET_CART = 'SET_CART'




export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_DATA:
            return Object.assign({}, state, { user: action.payload })

        case GET_ALL_PRODUCTS + '_FULFILLED':
            return Object.assign({}, state, { products: action.payload })

        case SET_CART:
            return Object.assign({}, state, { cart: action.payload })

        case REMOVE_FROM_CART:
        return Object.assign({}, state, { cart: action.payload})
        
        case CLEAR_CART:
        return Object.assign({}, state,{cart: action.payload})
        default:
            return state;
    }
}



export function getUser(userData) {
    return {
        type: GET_USER_DATA,
        payload: userData
    }
}

export function getProducts() {
    const allProducts = axios.get('/api/products').then(res => res.data)

    return {
        type: GET_ALL_PRODUCTS,
        payload: allProducts
    }
}

export function addToShoppingCart(product) {
    return {
        type: ADD_TO_SHOPPING_CART,
        payload: product,
        price: product.price
    }
}

export function removeFromCart(product){
    return {
        type: REMOVE_FROM_CART,
        payload: product
    }
}

export function clearCart() {
    return {
        type: CLEAR_CART,
        payload: []
        
    }
}
export function setCart(cart) {
    return {
        type: SET_CART,
        payload: cart
    }
}