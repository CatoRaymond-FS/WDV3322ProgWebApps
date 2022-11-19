//use express and router
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
//import db
const db = require('../../db/db');
//import mongoose
const mongoose = require('mongoose');
//json web token
const jwt = require('jsonwebtoken');
const { json } = require('express');
const checkAuth = require('../../auth/checkAuth');
const user = require('../models/user');

router.use(express.json());


//SIGNUP
router.post('/signup', (req, res) => {
    //find user by email address 
    //if user exists return 409 message "User already exists"
    //encrypt password with bcrypt
    //create new user object with id, firstName, lastName, address, city, state, zip, email, password
    //save user 
    //return 201 message "User created", email, and password

    db.findUser({email: req.body.email})
    .then(user => {
        if(user){
            return res.status(409).json({
                message: "User already exists"
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err){
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    const createdUser = new User({
                        _id: new mongoose.Types.ObjectId(),
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        address: req.body.address,
                        city: req.body.city,
                        state: req.body.state,
                        zip: req.body.zip,
                        email: req.body.email,
                        password: hash
                    });
                    db.saveUser(createdUser)
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: "User created",
                            email: result.email,
                            password: result.password
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
                }
            });
        }
    });
});






//LOGIN
router.post('/login', (req, res) => {
//do not send responses until the last line of code
//findUser
//get email and password from request
//if user not found return 401 message "User not found"
//else
//compare passwords with bcrypt.compare
//test for error or result
//if result 
//then 
//create token with jwt.sign
//send back in our payload return token and name: user.firstName

    db.findUser({email: req.body.email})
    .then(user => {
        if(!user){
            return res.status(401).json({
                message: "User not found"
            });
        } else {
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if(err){
                    return res.status(401).json({
                        message: "Auth failed 1"
                    });
                }
                if(result){
                    const token = jwt.sign({
                        email: user.email,
                        userId: user._id
                    }, process.env.JWT_KEY, {
                        expiresIn: "1h"
                    });
                    return res.status(200).json({
                        message: "Auth successful",
                        token: token,
                        name: user.firstName
                    });
                }
                res.status(401).json({
                    message: "Auth failed 2"
                });
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({

        });
    });
});




//PROFILE
router.get('/profile', checkAuth, (req, res, next) => {
   res.status(200).json({message: req.userData});
});

module.exports = router;