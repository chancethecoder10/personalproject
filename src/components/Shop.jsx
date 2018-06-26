import React, { Component } from 'react'
import { Jumbotron, Button, Alert } from 'react-bootstrap'
import { connect } from 'react-redux'
import { getProducts, getUser, addToShoppingCart } from '../ducks/user'
import '../styles/Shop.css'

class Shop extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            toggle: false,
            notLoggedIn: false,
            show: true
        }
        this.handleToggle = this.handleToggle.bind(this)
    }
    componentDidMount() {
        this.props.getProducts()
        this.props.getUser()
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
    addToCart(e){
        if( this.props.user.user_id ){
            this.props.addToShoppingCart(e)
        } else {
            this.setState({
                notLoggedIn: true
            })
        }
    }
    render() {
        let productDisplay = this.props.products.map((e, i) => {
            return (
                <div onMouseEnter={() => this.handleToggle()} key={i}>
                    <div className="column">
                        <div className='product-container'>
                            <div className='product-name'>{e.product_name}</div>
                            <div className='onhoverinfo'>
                                <p>{e.product_name}</p>
                                <br />
                                <p>Roast: {e.roast}</p>
                                <br />
                                <p>{e.price}</p>
                                <Button bsStyle="info" onClick={() => this.addToCart(e)}>Add To Cart</Button>
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
export default connect(mapStateToProps, { getProducts, getUser, addToShoppingCart })(Shop)