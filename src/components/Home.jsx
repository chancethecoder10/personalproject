import React, { Component } from 'react'
import { Jumbotron, Image, Alert, Grid} from 'react-bootstrap'
import { SocialIcon } from 'react-social-icons';
import '../styles/Home.css'




class Home extends Component {
    render() {
        return (
            <Jumbotron>
                    <div className='home-div'>
                    <Alert className='home-alert'>
                    <Grid>    
                    <SocialIcon url="https://www.facebook.com/mysfcrc/" color="#e9cb6e"/>|
                    <SocialIcon url="https://www.instagram.com/sanfrancoffee/" color="#e9cb6e"/>|
                    <SocialIcon url="https://twitter.com/web_fran" color="#e9cb6e"/>
                    </Grid>
                    <br />
                    <Image className='home-logo' responsive src={require('../assets/sanfranlogo.png')} />
                    <br />
                    <p>Your Atlanta neighborhood coffee roaster since 1992.</p>
                    </Alert>
                    </div>
            </Jumbotron>
        )
    }
}

export default Home