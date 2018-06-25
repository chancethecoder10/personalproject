import React, { Component } from 'react'
import { Jumbotron, Button, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { removeFromShoppingCart, clearCart } from '../ducks/user'
import Checkout from './Checkout'
import '../styles/Cart.css'

class Cart extends Component {
    constructor() {
        super()
        this.state = {
            notLoggedIn: false,
        }
    }
    render() {
        let shoppingCartDisplay = this.props.shoppingCart.map((e, i) => {
            return (
                <div className='shopping-cart-container' key={i}>
                <Button bsStyle="danger" onClick={() => this.props.removeFromShoppingCart(e)}>Remove</Button>
                <h2>{e.product_name}</h2>
                <p>{e.product_desc}</p>
                <h2>{e.roast} Roast</h2>
                <h1>${e.price}</h1>
                <hr />
                </div >
            )
    })
    return(
            <Jumbotron className = 'cartotron'>

            
            {
                shoppingCartDisplay[0] ?
                <Checkout/>
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