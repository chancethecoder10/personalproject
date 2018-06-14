import React, { Component } from 'react'
import { Jumbotron } from 'react-bootstrap'
import '../styles/Shop.css'

class Shop extends Component {
    render() {
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
export default Shop