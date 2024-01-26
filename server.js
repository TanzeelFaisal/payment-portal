require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000'
}))

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

app.post('/create-checkout-session', (req, res) => {
    res.json({url: 'Hi'})
})

app.listen(3001)