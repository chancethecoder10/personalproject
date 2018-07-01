import React, { Component } from 'react'
import { Jumbotron, Form, FormGroup, FormControl, ControlLabel, Button, Alert, Modal } from 'react-bootstrap'
import '../styles/Feedback.css'
import axios from 'axios';

class Feedback extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            phone: '',
            message: '',
            show: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleShow = this.handleShow.bind(this)
    }
    handleClose() {
        this.setState({ show: false })
    }
    handleShow() {
        this.setState({ show: true })
    }
    handleSubmit(e) {
        e.preventDefault()
        const { name, email, phone, message } = this.state
        axios.post('/api/form', {
            name,
            email,
            phone,
            message
        })
        this.setState({
            name: '',
            email: '',
            phone: '',
            message: '',
        })
        this.handleShow()
    }
    handleName(v) {
        this.setState({
            name: v
        })
    }
    handleEmail(v) {
        this.setState({
            email: v
        })
    }
    handlePhone(v) {
        this.setState({
            phone: v
        })
    }
    handleMessage(v) {
        this.setState({
            message: v
        })
    }
    render() {
        return (
            <Jumbotron>
                <Alert className='contact-alert'>
                    <h1>Contact Form</h1>
                    <Form>
                        <FormGroup controlId="formInlineName">
                            <ControlLabel>Name:</ControlLabel>{' '}
                            <FormControl onChange={(e) => this.handleName(e.target.value)} value={this.state.name} type="text" placeholder="name" />
                        </FormGroup>
                        <FormGroup controlId="formInlineEmail">
                            <ControlLabel>Email:</ControlLabel>{' '}
                            <FormControl onChange={(e) => this.handleEmail(e.target.value)} value={this.state.email} type="email" placeholder="email@example.com" />
                        </FormGroup>{' '}
                        <FormGroup controlId="formInlinePhone">
                            <ControlLabel>Phone:</ControlLabel>{' '}
                            <FormControl onChange={(e) => this.handlePhone(e.target.value)} value={this.state.phone} type="phone" placeholder="555-555-5555" />
                        </FormGroup>{' '}
                    </Form>
                    <br />
                    <Form>
                        <FormGroup>
                            <ControlLabel>Subject:</ControlLabel>
                            <FormControl onChange={(e) => this.handleMessage(e.target.value)} value={this.state.message} componentClass="textarea" placeholder="Send us a message for job opportunities, business inquiries, questions, comments and concerns." />
                        </FormGroup>
                        <Button onClick={this.handleSubmit} type="submit">Send Message</Button>
                    </Form>
                </Alert>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Your message has been sent!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Thanks for reaching out to us, we will be in touch with you soon.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </Jumbotron>
        )
    }
}
export default Feedback