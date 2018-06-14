import React, {Component} from 'react'
import {Button} from 'react-bootstrap'
// import {Link} from 'react-router-dom'

export default class Login extends Component {
    render() {
        return (
            <div>
                <a href={process.env.REACT_APP_LOGIN}>
                <Button>Login</Button>
                </a>
            </div>
        )
    }
}