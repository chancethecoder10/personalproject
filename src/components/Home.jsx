import React, { Component } from 'react'
import { Carousel, Image } from 'react-bootstrap'
import '../styles/Home.css'
import axios from 'axios'
class Home extends Component {
    constructor(){
        super()
        this.state = {
            images: [],

        }
    }
    componentDidMount(){
        axios.get('/getphotos').then(res => {
            this.setState({images: res.data.images})
        })
    }
    render() {
        let mappedImages = this.state.images.map((e,i) => {
            return <Carousel.Item className='insta-photos' key={i}><img  width={1920} height={1200} alt="1440x900" src={e}/></Carousel.Item>
        })
        return (
            // <div>
            //     <Jumbotron>
            //         <Grid>
            //             <Row>
            //                 <Col xs={12} md={4}>
            //                 <Image responsive={true} src="https://s3-media3.fl.yelpcdn.com/bphoto/9XCsqNJCCypVApjWF6vXkg/o.jpg" thumbnail />
            //                 </Col>
            //                 <Image src={require('../assets/sanfranlogo.png')}  responsive={true} thumbnail={true}/>
            //                 <p>Your Atlanta neighborhood coffee roaster since 1992, with 
            //                         3 locations to serve you.
            //                         <br/><br/> 
            //                 Virginia Highland, Poncey-Highland, and Candler Park.</p>
            //             </Row>
            //         </Grid>
            //     </Jumbotron>


            // </div>
            <div>
                <Carousel>
                    {mappedImages}
                <Carousel.Caption >
                <Image thumbnail src={require('../assets/sanfranlogo.png')}/>
                    {/* <h3 className='carousel-caption'>San Francisco Coffee</h3> */}

                    <p>Your Atlanta neighborhood coffee roaster since 1992.</p>
                </Carousel.Caption>
            </Carousel>
            </div>
        )
    }
}

export default Home