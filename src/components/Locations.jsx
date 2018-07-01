import React from 'react'
import {Jumbotron, Alert, Button} from 'react-bootstrap'
import Map from './Map'
import '../styles/Locations.css'

function Locations() {
return(
    <div>
    <Jumbotron>
        <Map />
        <br /><br />
        <Alert className='locations-alert'>
        <div className='store-1'><strong>Virginia Highlands</strong> - 1192 North Highland Ave NE, Atlanta, GA 30306 
        
        <Button bsStyle='info' className='directions-button'
        href='https://www.google.com/maps/place/San+Francisco+Coffee+Roasting+Co./@33.7873263,-84.3578007,17z/data=!3m1!4b1!4m5!3m4!1s0x88f50427737d4581:0xc4205d5acd9e76b5!8m2!3d33.7873263!4d-84.355612'
        >Directions</Button>
        </div>
        </Alert>
        <Alert>
        <div className='store-2'><strong>Ponce De Leon</strong> - 676 North Highland Avenue Northeast, Atlanta, GA 30306 
        
        <Button bsStyle='info' className='directions-button'
        href='https://www.google.com/maps/place/San+Francisco+Coffee+Roasting+Co/@33.787325,-84.3731216,14z/data=!4m8!1m2!2m1!1ssan+francisco+coffee+roasting+co!3m4!1s0x88f506a73752df19:0xd571547959ecd9e6!8m2!3d33.772893!4d-84.3526302'
        >Directions</Button>
        </div>
        </Alert>
        <Alert>
        <div className='store-3'><strong>Candler Park</strong> - 1660 DeKalb Ave NE # 100, Atlanta, GA 30307 
        
        <Button bsStyle='info' className='directions-button'
        href='https://www.google.com/maps/place/San+Francisco+Coffee+Roasting+Co/@33.7625507,-84.3355114,17z/data=!3m1!4b1!4m5!3m4!1s0x88f506b61c0a067b:0xaefd7d1de819dbc1!8m2!3d33.7625507!4d-84.3333227'
        >Directions</Button>
        </div>
        </Alert>
    </Jumbotron>
    </div>
    )
}
export default Locations