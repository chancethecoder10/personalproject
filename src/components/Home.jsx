import React, { Component } from 'react'
import { Jumbotron, Image, Grid, Row, Col } from 'react-bootstrap'
import '../styles/Home.css'

class Home extends Component {
    render() {
        return (
            <div>
                <Jumbotron>
                    <Grid>
                        <Row>
                            <Col xs={12} md={4}>
                            <Image responsive={true} src="https://s3-media3.fl.yelpcdn.com/bphoto/9XCsqNJCCypVApjWF6vXkg/o.jpg" thumbnail />
                            </Col>
                            <h3>San Francisco Coffee Roasting Co.</h3>
                            <p>Your Atlanta neighborhood coffee roaster since 1992, with 
                                    3 locations to serve you.
                                    <br/><br/> 
                            Virginia Highland, Poncey-Highland, and Candler Park.</p>
                        </Row>
                    </Grid>
                </Jumbotron>


            </div>
        )
    }
}

export default Home