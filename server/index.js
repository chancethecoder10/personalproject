require('dotenv').config()
const express = require('express')
const session = require('express-session')
const passport = require('passport')
const bodyParser = require('body-parser')
const massive = require('massive')
const Auth0Strategy = require('passport-auth0')
const ctrl = require('../server/ctrl')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)


const {
    SERVER_PORT,
    CONNECTION_STRING,
    SESSION_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,

} = process.env

const app = express()

app.use(bodyParser.json())

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
})
//////////////////////////////////////////////////////////////////////////////AUTH and SESSIONS
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid profile',

}, (accessToken, refreshToken, extraParams, profile, done) => {
    const db = app.get('db')

    let { id, displayName, email } = profile
    db.find_user([id]).then(user => {
        if (user[0]) {
            done(null, user[0].user_id)
        } else {
            db.create_user([displayName, email, id]).then((createdUser) => {
                done(null, createdUser[0].user_id)
            })
        }
    })
}))
passport.serializeUser((primaryKeyID, done) => {
    done(null, primaryKeyID)
})

passport.deserializeUser((primaryKeyID, done) => {
    app.get('db').find_session_user([primaryKeyID]).then(user => {
        done(null, user[0])
    })
})

app.get('/auth', passport.authenticate('auth0'))
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/shop'
}))
app.get('/auth/logout', (req, res) => {
    req.logOut();
    res.redirect('http://localhost:3000/#/')
})
app.get('/auth/user', (req, res) => {
    if (req.user) {
        res.status(200).send(req.user)
    } else {
        res.status(401).send('Unauthorized')
    }

})
/////////////////////////////////////////////////////////////////////////////////////////
//endpoints go here
app.get('/getphotos', ctrl.getPhotos)
app.get('/api/products', ctrl.getAll)
app.get('/api/userCart/:id', ctrl.getUserCart)
app.post('/api/addToCart/:id', ctrl.addToCart)
app.delete('/api/cartDelete/:id', ctrl.deleteCartItem)
///////////////////////////////////////////////////////////////////////////////////////// Stripe 

app.post('/charge/:id', function (req, res, next) {
    const amount = req.body.total * 100
    const charge = stripe.charges.create({
        amount,
        currency: 'usd',
        source: req.body.token.id,
        description: 'Quality Beans'
    }, function (err, charge) {
        if (err) return res.sendStatus(500)
        const db = req.app.get('db')
        const { id } = req.params
        db.clear_cart([id])
            .then(cart => res.status(200).send(cart))
        // return res.sendStatus(200);
    });
})





app.listen(SERVER_PORT, () => {
    console.log('Hey Listen!', SERVER_PORT)
})