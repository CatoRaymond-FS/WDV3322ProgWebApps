//use express and router
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
//import db
const db = require('../../db/db');
//import mongoose
const mongoose = require('mongoose');




router.post('/signup', (req, res) => {
    //findUser by email address {email: req.body.email}
    //if user exists return 409 message "User already exists"
    //encrypt password 
    //create new user object with email and encrypted password
    //save user 
    
    db.findUser(req.body.email)
    .then(user => {
        if(user) {
            res.status(409).json({message: "User already exists"})
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err) {
                    res.status(500).json({error: "Error, please try"})
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    });
                    user.save()
                    .then(result => {
                        res.status(201).json({message: "User created"})
                    })
                    .catch(err => {
                        res.status(500).json({error: err})
                    })
                }
            })
        }
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
})


router.post('/login', (req, res) => {
    //findUser
    //if user not found return 401 message Authentication failed
    //else compare passwords 
    //test for error
    //test for result
    //if result is true return 200 message Authentication successful and name
    
    db.findUser(req.body.email)
    .then(user => {
        if(user){
  bcrypt.compare(req.body.password, user.password, (err, result) => {
      if(err){return res.status(501).json({message: err.message})}

        if(result){
            res.status(200).json({
                message: "Login successful",
                result: result,
                email: user.email
            });
        }else{
            res.status(401).json({
                message: "Login failed",
                result: result
            });
        }
    });
        }else{
            res.status(401).json({
                message: "Login failed",
                result: result
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});


router.get('/profile', (req, res, next) => {
    res.status(200).json({
        message: '/profile - GET'
    });
});

module.exports = router;