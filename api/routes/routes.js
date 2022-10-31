//use express and router
const express = require('express');
const router = express.Router();
const User = require('../models/user');


router.post('/signup', (req, res) => {
    res.status(201).json({
        message: '/signup - POST'
    });
});

router.post('/login', (req, res) => {
    res.status(200).json({
        message: '/login - POST'
    });
});

router.get('/profile', (req, res, next) => {
    res.status(200).json({
        message: '/profile - GET'
    });
});

module.exports = router;