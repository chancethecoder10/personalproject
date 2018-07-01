import React, { Component } from 'react'
import { Jumbotron, Alert, Tabs, Tab } from 'react-bootstrap'
import ControlledCarousel from '../components/ControlledCarousel'
import '../styles/Menu.css'

class Menu extends Component {
    constructor() {
        super()
        this.state = {

        }
    }
    render() {
        return (
            <div>
                <Jumbotron>
                    <Alert className='menu-alert2'>
                        <h1>Food and Drink</h1>
                    </Alert>
                    <br /><br/>
                    <ControlledCarousel />
                    <br /><br />
                    <Alert className='menu-alert'>
                        <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
                            <Tab eventKey={1} title="Drinks">
                            <br />
                                <ul>Drip Coffee</ul>
                                <ul>Latte</ul>
                                <ul>Cappuccino</ul>
                                <ul>Macchiato</ul>
                                <ul>Cold Brew</ul>
                                <ul>Special Blend</ul>

                            </Tab>
                            <Tab eventKey={2} title="Sandwiches">
                            <br />
                                <p>All sandwiches are fresh, made-to-order on your choice of croissant, bagel, ciabatta or multigrain bread!</p>
                            <hr />
                                <ul>San Francisco Club</ul>
                                <ul>Chicken Salad Sandwich</ul>
                                <ul>Hummus B.L.T.</ul>
                                <ul>Wasabi Egg Salad Sandwich</ul>
                            </Tab>
                            <Tab eventKey={3} title="Breakfast">
                            <br />
                                <ul>Egg and Cheese Breakfast Sandwich</ul>
                                <ul>Bacon Cheddar Quiche</ul>
                                <ul>Veggie Variety Quiche</ul>
                                <ul>Bagel with Cream Cheese</ul>
                                <ul>Spa Breakfast Combo</ul>
                                <ul>Lo-Cal Combo</ul>
                            </Tab>
                            <Tab eventKey={4} title="Pastries">
                            <br />
                                <p>Our pastries vary day to day, are first come first serve and made in house from scratch!</p>
                            <hr />
                                <ul>Muffins</ul>
                                <ul>Croissants</ul>
                                <ul>Cookies</ul>
                                <ul>Cinnamon Knots</ul>
                                <ul>Ham and Cheese Croissants</ul>
                                <ul>Nutella Croissant</ul>
                                <ul>Banana Bread</ul>
                                <ul>Select Cakes</ul>
                            </Tab>
                        </Tabs>
                    </Alert>
                </Jumbotron>
            </div>
        )
    }
}



export default Menu