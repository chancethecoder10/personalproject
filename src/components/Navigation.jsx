import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { Navbar, Nav, NavItem, Image, Button, Badge} from 'react-bootstrap'
import '../styles/Navigation.css'

class Navigation extends Component {
    constructor(){
        super()

        this.state = {
            
        }
    }

    render() {
        return (
            
                <Navbar inverse collapseOnSelect fixedTop={true}>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to='/'><Image src="//nebula.wsimg.com/85e2c1679dd8c644ccf4c19eb71ba2a2?AccessKeyId=3327E7C0B0F5F7F6E29A&disposition=0&alloworigin=1" 
                             responsive={true}/>
                            </Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavItem eventKey={1} componentClass={Link} href="/about" to='/about'>
                                About    
                            </NavItem>
                            <NavItem eventKey={2} componentClass={Link} href="/menu" to='/menu'>
                                Menu     
                            </NavItem>
                            <NavItem eventKey={4} componentClass={Link} href="/locations" to='/locations'>
                                Locations 
                            </NavItem>
                        </Nav>
                        <Nav pullRight>
                        <NavItem eventKey={5} componentClass={Link} href='/shop' to='/shop'>
                                Shop 
                            </NavItem>            
                            <NavItem eventKey={6} componentClass={Link} href='/cart' to='/cart'>
                                Cart <Badge>{
                                      
                                      this.props.cart.length !== 0?
                                      this.props.cart.length 
                                      :
                                      null
                                      
                                    }</Badge>
                            </NavItem>
                            <NavItem componentClass={Link} href='/feedback' to='/feedback'>
                                Contact Us 
                            </NavItem>
                            {
                                this.props.user.user_id ? <NavItem componentClass='span' href={process.env.REACT_APP_LOGOUT}>
                                 <a href={process.env.REACT_APP_LOGOUT}>
                                <Button bsStyle='danger'>Logout</Button>
                                </a>
                                </NavItem>
                                :
                                
                                <NavItem componentClass='span' href={process.env.REACT_APP_LOGIN}>
                                <a href={process.env.REACT_APP_LOGIN}>
                                <Button bsStyle='warning'>Login</Button>
                                </a>
                                </NavItem>
                            }
                           <NavItem>
                          </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            
        )
    }
}

function mapStateToProps(state){
    console.log(state)
    return {
        user: state.user,
        shoppingCart: state.shoppingCart,
        cart: state.cart
    }
}

export default connect(mapStateToProps, {})(Navigation)