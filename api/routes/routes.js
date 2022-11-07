//use express and router
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
//import db
const db = require('../../db/db');
//import mongoose
const mongoose = require('mongoose');



//SIGNUP
router.post('/signup', (req, res) => {
    //findUser by email address {email: req.body.email}
    //if user exists return 409 message "User already exists"
    //encrypt password 
    //create new user object with email and encrypted password
    //save user 
    const password = req.body.password;
    bcrypt.hash(password, 10, (err, hash) => {
        if (err){
            res.status(409).json({error: err.message});
        } else {
            const user = new User({
                _id: mongoose.Types.ObjectId(),
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                address: req.body.address,
                city: req.body.city,
                state: req.body.state,
                zip: req.body.zip,
                email: req.body.email,
                password: hash
            });
            db.saveUser(user)
            .then(result => {
                res.status(201).json({
                    message: 'User created',
                    user: result,
                });
            })  
            .catch(err => {
                res.status(500).json({error: err.message});
            }
            );  
        }
    });
});


//LOGIN
router.post('/login', (req, res) => {
 //find the user 
 //if no user send 401 message "User not found"
 //else
 //user returned with hashed password
 //compare password with hashed password
 //returns err, result: where result is true or false
 //if result is false send 401 message "Incorrect password"
 //else send 200 message "Login successful"
 //user object back
    db.findUser(req.body.email)
    .then(user => {
        if (!user){
            res.status(401).json({message: 'User not found'});
        } else {
              bcrypt.compare(req.body.password, user.password, (err, result) => {
                if(err){
                    return res.status(500).json({error: err.message});
                }
                else{
                    if(result){
                        res.status(201).json({
                            message: 'Login successful',
                            result: result,
                            user: user
                        });
                    }
                    else{
                        res.status(401).json({message: 'Incorrect password'});
                    }
                }
            
            });
        }
    })
});


//PROFILE
router.get('/profile', (req, res, next) => {
    res.status(200).json({
        message: '/profile - GET'
    });
});

module.exports = router;