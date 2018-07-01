import React, { Component } from 'react'
import { Jumbotron, Alert, Image } from 'react-bootstrap'
import '../styles/About.css'

class About extends Component {
    render() {
        return (
            <Jumbotron>
                <div className='about-text'>
                    <Alert className='about-alert'>
                        <h1>The Bonds and the Beans</h1>
                        <Image className='doug' responsive={true} src={require('../assets/dougiefresh.jpeg')} />
                        <br /><br />
                        <p>More than twenty years ago, Doug and Tanya journeyed from San Francisco to create a unique coffee community in Atlanta,
                        a city thirsty for specialty coffee roasting. Doug and Tanya’s vision echoed their Bay area experience:
                        Coffee roasted daily in an engaging neighborhood space with breezy oversized French windows, bikes and dogs out front,
                        people drawn together from all walks of life, strangers chatting, reading books, friends laughing – all gathered around a delicious social sip.
                        Today, San Francisco Coffee Roasting Company serves the in-town Atlanta communities with three stores offering the best quality,
                        fresh roasted coffee, served by a friendly, eclectic staff in a vibrant coffee house experience -- fertile grounds for a meeting of the minds,
            where conversation and ideas flow.</p>
                        <br />
                        <strong>"As ‘20-somethings’ we had a passion for the best quality coffee beans, the artistic technical roasting process and a vibrant community
                        atmosphere – even back then, we knew, we just knew that this is what we wanted to do.”
            -- Doug Bond, co-founder of San Francisco Coffee Roasting Company</strong>
                    </Alert>
                </div>
            </Jumbotron>
        )
    }
}
export default About