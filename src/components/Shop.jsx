import React, { Component } from 'react'
import { Jumbotron, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { getProducts, getUser } from '../ducks/user'
import '../styles/Shop.css'

class Shop extends Component {
    constructor() {
        super()

        this.state = {
            toggle: false
        }
        this.handleToggle = this.handleToggle.bind(this)
    }

    componentDidMount() {
        this.props.getProducts()
        this.props.getUser()

    }

    handleToggle() {
        this.setState({
            toggle: !this.state.toggle
        })
    }


    render() {

        let productDisplay = this.props.products.map((e, i) => {

            return (

                <div onMouseEnter={() => this.handleToggle()} key={i}>

                    <div className="column">
                        <div className='product-container'>
                            <div className='onhoverinfo'>
                                <p>{e.product_name}</p>
                                <br />
                                <p>Roast: {e.roast}</p>
                                <br />
                                <p>{e.price}</p>
                                <Button bsStyle="info">Add To Cart</Button>
                            </div>
                        </div>
                    </div>
                </div>

            )
        })
        return (
            <Jumbotron className='shopotron'>
                <div id="showgrid">
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



export default connect(mapStateToProps, { getProducts, getUser })(Shop)