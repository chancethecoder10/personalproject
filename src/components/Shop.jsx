import React, { Component } from 'react'
import { Jumbotron } from 'react-bootstrap'
import {connect} from 'react-redux'
import {getProducts, getUser} from '../ducks/user'
import '../styles/Shop.css'

class Shop extends Component {


    componentDidMount(){
        this.props.getProducts()
        this.props.getUser()
        
    }
    
    
    render() {
        console.log(this.props.user)
        console.log(this.props.products)
        let productDisplay = this.props.products.map((element, index) =>{
            return(
                <div className='product-container' key={index}>
                <h2>{element.product_name}</h2>
                <h2>{element.price}</h2>
                <h2>{element.roast}</h2>
                <h2>{element.product_desc}</h2>
                </div>
            )
        })
        return (
            <Jumbotron className='shopotron'>
                <div id="showgrid">
                    <div className="row">
                        <div className="column"></div>
                        <div className="column"></div>
                        <div className="column"></div>
                    </div>
                    <div className="row">
                        <div className="column"></div>
                        <div className="column"></div>
                        <div className="column"></div>
                    </div>
                    <div className="row">
                        <div className="column"></div>
                        <div className="column"></div>
                        <div className="column"></div>
                    </div>
                </div>
            </Jumbotron>
        )
    }
}

function mapStateToProps(state){
    return{
        products: state.products,
        user: state.user
    }
}



export default connect(mapStateToProps, {getProducts, getUser})(Shop)