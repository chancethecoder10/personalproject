import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {clearCart} from '../ducks/user'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import '../styles/Checkout.css'

class Checkout extends Component {
    constructor(){
        super()
        this.state = {
            redirect: false
        }
        
    }
    onToken = (token) => {
        token.card = void 0;
        axios.post('/charge',{token, total: this.props.total}).then((res)=> {
            if(res.status === 200) {
                this.setState({
                    redirect: true
                })
                this.props.clearCart()
            }
            console.log(res)
        })
    }
    render(){
        if(this.state.redirect)
            return <Redirect to='/thankyou'/>
        return(
            <div className='checkout'>
            <StripeCheckout
            token={this.onToken}
            stripeKey={'pk_test_5CFGtvmT81fWdVHdgHACJH6n'}
            amount={this.props.total * 100}
            >
            </StripeCheckout>
            </div>
           
        )
    }
}
function mapStateToProps(state){
    const{total} = state
    return{
        total
    }
}
export default connect(mapStateToProps,{clearCart})(Checkout)