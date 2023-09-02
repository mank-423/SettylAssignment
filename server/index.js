const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/usermodel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const jwtSecret = 'secret123'


mongoose.connect('mongodb+srv://admin-mank:mankMongo@cluster0.5sulplv.mongodb.net/mern-login', { useNewUrlParser: true })

const PORT = 5000

app.use(cors())
app.use(express.json())

//Working on validation while registering
app.post('/api/register', async (req, res) => {
    try {
        const newPassword = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: newPassword,
        })

        res.json({ status: 'ok' });
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'Duplicate email' });
    }
})

app.post('/api/login', async (req, res) => {
    const newPassword = bcrypt.hash(req.body.password, 10)

    const user = await User.findOne({
        email: req.body.email,
        // password: req.body.password,
    })
    if (!user) {
        return res.json({ 
            status: 'error', 
            error: 'Invalid Email' 
        })
    }

    const isPasswordValid = await bcrypt.compare(
        req.body.password, 
        user.password
    );

    if (isPasswordValid) {
        const token = jwt.sign({
            name: user.name,
            email: user.email,
        }, jwtSecret);

        return res.json({ status: 'ok', user: token });
    } else {
        return res.json({ status: 'error', user: false });
    }
})

app.get('/api/quote', async (req, res) => {
    const token = req.headers['x-access-token']
    try {
        const decoded = jwt.verify(token, jwtSecret);
        const emailUser = decoded.email;

        const user = await User.findOne({ email: emailUser })

        return res.json({ status: 'ok', quote: user.quote })
    } catch (error) {
        console.log(error);
        res.json({ status: 'error', error: 'invalid token' })
    }
})

app.post('/api/quote', async (req, res) => {
    const token = req.headers['x-access-token']
    try {
        const decoded = jwt.verify(token, jwtSecret);
        const emailUser = decoded.email;

        await User.updateOne(
            { email: emailUser },
            {
                $set: { quote: req.body.quote }
            })

        return res.json({ status: 'ok' });
    } catch (error) {
        console.log(error);
        res.json({ status: 'error', error: 'invalid token' })
    }
})

app.get('/hello', (req, res) => {
    res.send("Hello World")
})


app.listen(PORT, (req, res) => {
    console.log("Server started on port", PORT);
})