import React, { Component } from 'react'
import { Jumbotron, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'

class Feedback extends Component {
    constructor() {
        super()

    }
    render() {
        return (
            <Jumbotron>
                <FormGroup controlId="formControlsTextarea">
                    <ControlLabel>Comments</ControlLabel>
                    <FormControl componentClass="textarea" placeholder="Type here" />
                </FormGroup>
            </Jumbotron>
        )
    }

}
export default Feedback