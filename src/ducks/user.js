import axios from 'axios'

const initialState = {
    products: [],
    user: {},
    
}

const GET_USER_DATA = 'GET_USER_DATA'
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'





export default function reducer( state = initialState, action) {
    switch(action.type){
        case GET_USER_DATA + '_FULFILLED':
        return Object.assign({}, state, {user: action.payload})
        case GET_ALL_PRODUCTS + '_FULFILLED':
        console.log(action.payload)
        return Object.assign({}, state, {products: action.payload})
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