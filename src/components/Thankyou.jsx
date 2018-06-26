import React from 'react'
import {Link} from 'react-router-dom'
import { Button,  Modal} from 'react-bootstrap'

class Example extends React.Component {
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
          {/* <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
            Launch demo modal
          </Button> */}
  
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Your order has been placed.</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Thank you for your purchase!</h4>
              <p>
                You can pick up your order at our Virginia Highlands location. Need directions? Click the directions button at the bottom.
              </p>
            </Modal.Body>
            <Modal.Footer>
                <Button bsStyle='success' componentClass={Link} href='/locations' to='/locations'>Directions</Button>
              <Button onClick={this.handleClose} componentClass={Link} href='/shop' to='/shop'>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
  }
  
 
  export default Example