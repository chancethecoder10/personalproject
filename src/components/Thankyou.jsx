import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Modal } from 'react-bootstrap'

class Thankyou extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      show: true
    };
  }
  handleClose() {
    this.setState({ show: false });
  }
  handleShow() {
    this.setState({ show: true });
  }
  render() {
    return (
      <div className='thank-you-modal'>
        <Modal show={this.state.show} onHide={this.handleClose} componentClass={Link} href='/cart' to='/cart'>
          <Modal.Header>
            <Modal.Title>Your order has been placed.</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4><strong>Thank you for your purchase!</strong></h4>
            <p>
              You should recieve a confirmation SMS-text message. 
              <hr />
              You can pick up your order at our Virginia Highlands location.
              <hr /> 
              <strong> Need directions?</strong> Click the directions button at the bottom.
              </p>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle='success' componentClass={Link} href='/locations' to='/locations'>Directions</Button>
            <Button onClick={this.handleClose} componentClass={Link} href='/cart' to='/cart'>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default Thankyou