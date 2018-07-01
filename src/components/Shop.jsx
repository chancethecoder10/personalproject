import React, { Component } from 'react'
import { Jumbotron, Button, Alert } from 'react-bootstrap'
import { connect } from 'react-redux'
import { getProducts, getUser, setCart } from '../ducks/user'
import '../styles/Shop.css'
import axios from 'axios';

class Shop extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            toggle: true,
            notLoggedIn: false,
            show: true
        }
        this.handleToggle = this.handleToggle.bind(this)
    }
    componentDidMount() {
        this.props.getProducts()
    }
    handleDismiss(){
        this.setState({
            show: false
        })
    }
    handleToggle() {
        this.setState({
            toggle: !this.state.toggle
        })
    }
    addToCart(id, e){
        if( this.props.user.user_id ){
            axios.post(`/api/addToCart/${id}`).then(
                res => {
                   this.props.setCart(res.data)
                   console.log(res.data)
                }

            )
            // this.props.addToShoppingCart(e)
        } else {
            this.setState({
                notLoggedIn: true
            })
        }
    }
    render() {
        let productDisplay = this.props.products.map((e, i) => {
            return (
                <div className='test' onMouseEnter={() => this.handleToggle()} key={i}>
                    <div className="column">
                        <div className='product-name'>{e.product_name}</div>
                        <div className='product-container'>
                        {/* {
                            
                            this.state.toggle ?
                            <div className='product-name'>{e.product_name}</div>
                            :
                            null
                            
                        } */}
                            <div className='onhoverinfo'>
                                <p>{e.product_name}</p>
                                <p>{e.roast} Roast</p>
                                <p>{e.price}</p>
                                <Button onClick={() => this.addToCart(e.product_id)}>Add To Cart</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
        return (
            <Jumbotron className='shopotron'>
                <div id="showgrid">
                    {
                        this.state.notLoggedIn
                            ?
                            <Alert bsStyle='warning'>Please <strong>log in</strong> to make purchases.</Alert>
                            :
                            null
                    }
                    <div className="row">
                        {productDisplay}
                    </div>
                </div>
            </Jumbotron>
        )
    }
}
function mapStateToProps(state) {
    return {
        products: state.products,
        user: state.user
    }
}
export default connect(mapStateToProps, { getProducts, getUser, setCart })(Shop)