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
            redirect: false,
            show: false,
            id: ''
        }
        this.handleShow = this.handleShow.bind(this);
    }
    componentDidMount(){
        axios.get('/auth/user').then(res => {
            this.setState({
                id: res.data.user_id
            })
        })
    }
    handleShow() {
        this.setState({ show: true });
    }
   
    onToken = (token) => {
        token.card = void 0;
        axios.post(`/charge/${this.state.id}`,{token, total: this.props.total}).then((res)=> {
            if(res.status === 200) {
                this.setState({
                    redirect: true
                })
                
            }
            console.log(res)
        })
    }
    render(){
        console.log(this.state)
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

export default connect(null, {clearCart})(Checkout)