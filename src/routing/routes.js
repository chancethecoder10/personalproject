import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from '../components/Home'
import Menu from '../components/Menu'
import About from '../components/About'
import Locations from '../components/Locations'
import Shop from '../components/Shop'
import Cart from '../components/Cart'
import Careers from '../components/Careers'
import Wholesale from '../components/Wholesale'
import BizInq from '../components/BizInq'
import Feedback from '../components/Feedback'


export default(
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/menu' component={Menu}/>
        <Route path='/about' component={About}/>
        <Route path='/locations' component={Locations}/>
        <Route path='/shop' component={Shop}/>
        <Route path='/cart' component={Cart}/>
        <Route path='/careers' component={Careers}/>
        <Route path='/wholesale' component={Wholesale}/>
        <Route path='/inquiries' component={BizInq}/>
        <Route path='/feedback' component={Feedback}/>
    </Switch>
)