import React, { Component } from 'react'
import { Jumbotron } from 'react-bootstrap'
import '../styles/Feedback.css'

class Feedback extends Component {
    constructor(){
        super()
        this.state = {
            name: '',
            email: '',
            phone: '',
            message: ''
        }
    }
    handleName(v){
        this.setState({
            name: v
        })
    }
    handleEmail(v){
        this.setState({
            email: v
        })
    }
    handlePhone(v){
        this.setState({
            phone: v
        })
    }
    handleMessage(v){
        this.setState({
            message: v
        })
    }
    render() {
        
        return (
            <Jumbotron>
                <div className='form-div'>
                <p>Contact us!</p>
                <input onChange={(e) => this.handleName(e.target.value)}
                type="text" 
                className='name-form'  
                placeholder='Enter your name'/>
                <br />
                <input onChange={(e) => this.handleEmail(e.target.value)}
                type="text" 
                className='email-form'  
                placeholder='Enter email'/>
                <br />
                <input onChange={(e) => this.handlePhone(e.target.value)}
                type='text' 
                className='phone-form'  
                placeholder='Enter your phone number'/>
                <br />
                <textarea onChange={(e) => this.handleMessage(e.target.value)}
                className='message-form' 
                type='text'  
                placeholder='Send us your feedback'/>
                <br />
                <button type='submit'>Send</button>
                </div>
            </Jumbotron>
        )
    }

}
export default Feedback