require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000'
}))

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

const minAmount = new Map([
    [1, { priceInPaisas: 2000000, name: "Tuition Fee, Hostel Charges, and University Dues" }],
    [2, { priceInPaisas: 60000, name: "Test Fee" }],
    [3, { priceInPaisas: 600000, name: "Clearance Fee" }],
])

app.post('/create-checkout-session', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: [{
                price_data: {
                    currency: 'pkr',
                    product_data: {
                        name: req.body.paymentType
                    },
                    unit_amount: Math.max((req.body.amount * 100), minAmount.get(req.body.id).priceInPaisas)
                },
                quantity: 1
            }],
            success_url: `${process.env.CLIENT_URL}/success`,
            cancel_url: `${process.env.CLIENT_URL}/cancel`
        })
        res.json({url: session.url})
    } catch(e) {
        res.status(500).json({error: e.message})
    }
})

app.listen(3001)