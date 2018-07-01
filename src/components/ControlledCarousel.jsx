import React, {Component} from 'react'
import {Carousel, Image} from 'react-bootstrap'
import axios from 'axios'
import '../styles/ControlledCarousel.css'

class ControlledCarousel extends Component {
    constructor(props, context) {
      super(props, context);
  
      this.handleSelect = this.handleSelect.bind(this);
  
      this.state = {
        index: 0,
        direction: null,
        images: []
      };
    }
    componentDidMount() {
        axios.get('/getphotos').then(res => {
            this.setState({ 
                images: res.data.images, 
            })
        })
    }
    
  
    handleSelect(selectedIndex, e) {
      this.setState({
        index: selectedIndex,
        direction: e.direction
      });
    }
  
    render() {
      const { index, direction } = this.state;
      let mappedImages = this.state.images.map((e, i) => {
        return <Carousel.Item className='insta-photos' key={i}><Image responsive width={900} height={500} alt="900x500" src={e} /></Carousel.Item>
      })
     
      return (
        
           
        <Carousel 
          animate='true'
          interval={2000}
          activeIndex={index}
          direction={direction}
          onSelect={this.handleSelect}
        >
         {mappedImages}
        </Carousel>
      );
    }
  }
  export default ControlledCarousel