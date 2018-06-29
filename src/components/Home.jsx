import React, { Component } from 'react'
import {Carousel, Jumbotron} from 'react-bootstrap'
import '../styles/Home.css'
import axios from 'axios'
class Home extends Component {
    constructor(){
        super()
        this.state = {
            images: []
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
            <div className='home-tron'>
                <Jumbotron>

                </Jumbotron>
            </div>
        )
    }
}

export default Home