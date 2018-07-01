import React, { Component } from 'react'
import axios from 'axios'
import {getUser, setCart} from '../ducks/user'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { Navbar, Nav, NavItem, Image, Button, Badge} from 'react-bootstrap'
import '../styles/Navigation.css'

class Navigation extends Component {
    componentDidMount(){
        axios.get('/auth/user').then(res => {
            this.props.getUser(res.data)
        }).then(() => {
            axios.get(`/api/userCart`)
            .then(res => {
            this.props.setCart(res.data)
            })
        })
    }
    render() {
        return (
            
                <Navbar inverse collapseOnSelect fixedTop={true}>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to='/'><Image src={require('../assets/sanfranlogo.png')} 
                             responsive={true}/>
                            </Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavItem eventKey={1} componentClass={Link} href="/" to='/'>
                                Home   
                            </NavItem>
                            <NavItem eventKey={2} componentClass={Link} href="/about" to='/about'>
                                About    
                            </NavItem>
                            <NavItem eventKey={3} componentClass={Link} href="/menu" to='/menu'>
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
                                      
                                      this.props.cart.length
                                      ?
                                      this.props.cart.length 
                                      :
                                      null
                                      
                                    }</Badge>
                            </NavItem>
                            <NavItem componentClass={Link} href='/feedback' to='/feedback'>
                                Contact Us 
                            </NavItem>
                            {
                                this.props.user.user_id
                                ? 
                                <NavItem componentClass='span' href={process.env.REACT_APP_LOGOUT}>
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
    return {
        user: state.user,
        cart: state.cart
    }
}
export default connect(mapStateToProps, {getUser, setCart})(Navigation)