import React, { Component } from 'react'
import { Jumbotron, Button, Alert, Image, Col, Grid, Badge } from 'react-bootstrap'
import { connect } from 'react-redux'
import { removeFromShoppingCart, clearCart } from '../ducks/user'
import axios from 'axios'
import Checkout from './Checkout'
import '../assets/sign.jpg'
import '../styles/Cart.css'

class Cart extends Component {
    constructor() {
        super()
        this.state = {
            notLoggedIn: false,
            userId: 0,
            cart: [],
            total: 0
        }
    }
    componentDidMount(){
        axios.get('/auth/user').then(user => {
            console.log(user.data)
            if (user.data.name !== undefined){
                this.setState({
                    userId: user.data.user_id
                })
            }
        }).then(() => {
            axios.get(`/api/userCart/${this.state.userId}`)
            .then(res => {
                this.setState({
                    cart: res.data
                })
                this.calculateTotal()
            })
        })
    }
    deleteCartItem(id){
        axios.delete(`/api/cartDelete/${id}`)
            .then(() => {
                axios.get(`/api/userCart/${this.state.userId}`).then(res => {
                    this.setState({
                        cart: res.data
                    })
                    this.calculateTotal()
                })
            })
    }
    calculateTotal(){
        let cartTotal = 0
        for(let i = 0; i < this.state.cart.length; i++ ){
            cartTotal += +this.state.cart[i].price * this.state.cart[i].quant
        } this.setState({
            total: cartTotal
        })
    }
    render() {
        console.log(this.state)
        let shoppingCartDisplay = this.state.cart.map((e, i) => {
            return (
                <div className='shopping-cart-container' key={i}>
                <Grid>    
                <h2>{e.product_name}</h2>
                    <Col xs={3} md={3}>
                    <Image src={require('../assets/download.jpeg')}  responsive={true} thumbnail={true}/>
                    </Col>
                <p>{e.product_desc}</p>
                <h2>{e.roast} Roast</h2>
                <h2><Button bsStyle="danger" onClick={() => this.deleteCartItem(e.cart_id)}>Remove</Button> ${e.price} <Badge bsStyle='lg, reset'>{e.quant}</Badge></h2>
                
                </Grid>
                </div >
            )
    })
    return(
            <Jumbotron className = 'cartotron'>
            {
                shoppingCartDisplay[0] ?
                <Checkout total={this.state.total}/>
                :
                shoppingCartDisplay
            }
                { shoppingCartDisplay[0] ?
                shoppingCartDisplay
                : <Alert bsStyle='warning' className='cart-alert'>Your cart is <strong>empty.</strong>
                </Alert>
                }
            </Jumbotron >
        )
    }
}
function mapStateToProps(state) {
    return {
        shoppingCart: state.shoppingCart,
        total: state.total
    }
}
export default connect(mapStateToProps, { removeFromShoppingCart, clearCart })(Cart)