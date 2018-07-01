require('dotenv').config()
const express = require('express')
const session = require('express-session')
const passport = require('passport')
const bodyParser = require('body-parser')
const massive = require('massive')
const Auth0Strategy = require('passport-auth0')
const ctrl = require('../server/ctrl')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const path = require('path')
const nodemailer = require('nodemailer')

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
app.use( express.static( `${__dirname}/../build` ) );
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
    successRedirect: `${process.env.FRONTEND_URL}#/shop`
}))
app.get('/auth/logout', (req, res) => {
    req.logOut();
    res.redirect(`${process.env.FRONTEND_URL}#/`)
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
app.get('/api/userCart', ctrl.getUserCart)
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
/////////////////////////////////////////////////////////////////////////////////////////////nodemailer
app.post('/api/form', function(req,res) {
    nodemailer.createTestAccount((err, account) => {
        const htmlEmail = `
          <h1>Contact Details</h1>
          <ul>
            <li>Name: ${req.body.name}</li>
            <li>Email: ${req.body.email}</li>
            <li>Phone: ${req.body.phone}</li>
          </ul>
          <h1>Message</h1>
          <p>${req.body.message}</p>
        `
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: `${process.env.TEST_EMAIL}`,
                pass: `${process.env.TEST_EMAIL_PASS}`
            }
        })
        let mailOptions = {
            from: `${req.body.email}`,
            to: `${process.env.TEST_EMAIL}`,
            replyTo: `${req.body.email}`,
            subject: `New Message from ${req.body.name}`,
            text: req.body.message,
            html: htmlEmail
        }

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return console.log(err)
            } 
            console.log('Message Sent: %s', info.messageId)
            console.log('Message URL: %s', nodemailer.getTestMessageUrl(info))
        })
    })
})

////////////////////////////////////////////////////////////////////////////////////////////

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html'));
});


app.listen(SERVER_PORT, () => {
    console.log('Hey Listen!', SERVER_PORT)
})