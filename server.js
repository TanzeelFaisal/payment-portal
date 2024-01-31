require('dotenv').config()

const express = require('express')
const { ObjectId } = require('mongodb')
const { connectDb, getDb } = require('./mongodb')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000'
}))

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)
let db = null

const minAmount = new Map([
    [1, { priceInPaisas: 2000000, name: "Tuition Fee, Hostel Charges, and University Dues" }],
    [2, { priceInPaisas: 60000, name: "Test Fee" }],
    [3, { priceInPaisas: 600000, name: "Clearance Fee" }],
])

connectDb(err => {
    if (!err) {
        app.listen(3001)
        db = getDb()
    }
})

app.get('/users', async (req, res) => {
    try {
        const users = await db.collection('users')
                                .find()
                                .toArray();
        res.status(200).json({ users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/payments', async (req, res) => {
    try {
      const payments = await db.collection('payments')
                              .find()
                              .sort({ dateTime: -1 }) // Sort by dateTime in descending order
                              .toArray();
      res.status(200).json({ payments });
    } catch (error) {
      console.error('Error fetching payments:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

app.post('/approve-user', async (req, res) => {
    const userId = req.body.id;
    
    try {
        const user = await db.collection('users').findOneAndUpdate(
            { _id: new ObjectId(userId) },
            { $set: { approved_status: true } },
            { returnOriginal: false }
        );

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User approved successfully', user: user.value });
    } catch (error) {
        console.error('Error approving user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        console.log('Attempting login with email:', email);
        const user = await db.collection('users').findOne({ studentEmail: email });
        console.log('Retrieved user:', user);
        if (!user) {
            return res.status(404).json({ error: 'User doesn\'t exist' });
        }
        if (user.password !== password) {
            return res.status(401).json({ error: 'Incorrect email or password' });
        }
        if (!user.approved_status) {
            return res.status(403).json({ error: 'Your account is pending approval' });
        }
        res.status(200).json({ message: 'Login successful', user: user });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/submit-payment-details', async (req, res) => {
    const { studentName, studentRegNo, studentEmail, studentCNIC, password, program, term, selectedRelation } = req.body;

    try {
        const existingUser = await db.collection('users').findOne({ $or: [{ studentCNIC }, { studentEmail }, { studentRegNo }] });
        if (existingUser) {
            return res.status(400).json({ error: 'Student CNIC, Email, or Registration No already exists' });
        }

        const result = await db.collection('users').insertOne({
            studentName,
            studentRegNo,
            studentEmail,
            studentCNIC,
            password,
            program,
            term,
            selectedRelation,
            approved_status: false
        });

        res.status(201).json({ message: 'Payment details submitted successfully', user: result });
    } catch (error) {
        console.error('Error submitting payment details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/save-payment-data', async (req, res) => {
    const { studentName, studentRegNo, studentEmail, amount, paymentType, date } = req.body;
  
    try {
      const result = await db.collection('payments').insertOne({
        studentName,
        studentRegNo,
        studentEmail,
        amount,
        paymentType,
        date: new Date(date),
      });
  
      res.status(201).json({ message: 'Payment data saved successfully' });
    } catch (error) {
      console.error('Error saving payment data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

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
            success_url: `${process.env.CLIENT_URL}/payment-success`,
            cancel_url: `${process.env.CLIENT_URL}/select-payment`
        })
        res.json({url: session.url})
    } catch(error) {
        res.status(500).json({error: error.message})
    }
})