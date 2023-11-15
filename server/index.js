const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/usermodel')
const item = require('./models/Item')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const http = require('http');
const webSocketServer = require('websocket').server;
const jwtSecret = 'secret123'
const PORT = 5000


async function connect() {
    try {
        await mongoose.connect('mongodb+srv://mankmern:mankmern@mernproject.bicx37m.mongodb.net/settyl?retryWrites=true&w=majority', { useNewUrlParser: true })
        console.log("Connect to mongoDB");
    } catch (error) {
        console.log(error);
    }
}

connect();

app.use(cors())
app.use(express.json())

//Working on validation while registering
app.post('/api/register', async (req, res) => {
    try {
        const newPassword = await bcrypt.hash(req.body.password, 10);

        const user = await User.create({
            name: req.body.name,
            username: req.body.userName,
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

app.post('/api/items', async (req, res) => {
    try {
        // Get the token from the request headers
        const token = req.headers['x-access-token'];

        // Verify the token to get the user information
        const decoded = jwt.verify(token, jwtSecret); // Replace with your actual secret key

        const newItem = new item({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            user: req.body.user, // Associate the item with the user
        });

        await newItem.save();

        res.json({ status: 'ok', item: newItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', error: 'Internal Server Error' });
    }
});

// Update the route in your backend
app.get('/api/items/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const items = await item.find({ user: userId });
        res.json({ status: 'ok', items });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', error: 'Internal Server Error' });
    }
});

app.get('/api/items', async (req, res) => {
    try {
        const items = await item.find();
        res.json({ status: 'ok', items })
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'error', error: 'Internal Server Error' });
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