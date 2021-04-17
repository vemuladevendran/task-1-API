'use strict'

const express = require('express');
const cors = require('cors');
require('./db');
const User = require('./user.model')

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// insert data

app.post('/api/v1/users', async (req, res, next) => {
    try {
        const user = await User.findOne({ userName: req.body.userName });
        if (user) {
            return res.status(400).json({ message: 'User Name Already exist' });
        }

        const data = await User.create(req.body);
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

// retrive data

app.get('/api/v1/users', async (req, res, next) => {
    try {
        const data = await User.find({})
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

// update data

app.put('/api/v1/users/:id', async (req, res, next) => {
    try {

        const results = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(results);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// update data

app.delete('/api/v1/users/:id', async (req, res, next) => {
    try {

        const results = await User.findByIdAndRemove(req.params.id);
        res.json({ message: results.firstName + 'account deleted' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`server is listering on the PORT ${PORT}`)
})