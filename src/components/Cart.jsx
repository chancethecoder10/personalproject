import React, { Component } from 'react'
import { Jumbotron, Button, Alert, Image, Col, Grid, Badge } from 'react-bootstrap'
import { connect } from 'react-redux'
import { removeFromCart, clearCart } from '../ducks/user'
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
      this.calculateTotal()
    }
    deleteCartItem(id){
        axios.delete(`/api/cartDelete/${id}`)
            .then(res => {
                    this.props.removeFromCart(res.data)
                    // this.calculateTotal()
                })
            
    }
    calculateTotal(){
        let cartTotal = 0
        for(let i = 0; i < this.props.cart.length; i++ ){
            cartTotal += this.props.cart[i].price * this.props.cart[i].quant
        } this.setState({
            total: cartTotal
        })
    }
    render() {
        let shoppingCartDisplay = this.props.cart.map((e, i) => {
            return (
                <div className='shopping-cart-container' key={i}>
                <Alert className='checkout-alert'>   
                <Grid> 
                <h2>{e.product_name}</h2>
                    <Col xs={2} md={2.5}>
                    <Image src={require('../assets/download.jpeg')}  responsive={true}/>
                    </Col>
                <p>{e.product_desc}</p>
                <br />
                <h2>{e.roast} Roast</h2>
                <h2><Button bsStyle="danger" onClick={() => this.deleteCartItem(e.cart_id)}>Remove</Button>${e.price} | x{e.quant}</h2>
                <br />
                </Grid>
                </Alert>
                </div >
            )
    })
    return(
            <Jumbotron className = 'cartotron'>
            {
                shoppingCartDisplay[0] ?
                <Checkout className='stripe-btn' total={this.state.total}/>
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
        cart: state.cart,
    }
}
export default connect(mapStateToProps, { removeFromCart, clearCart })(Cart)