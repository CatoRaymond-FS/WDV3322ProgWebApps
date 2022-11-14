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
                    email: result.email,
                    password: result.password
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
//findUser
//if user not found return 401 message "User not found"
//else
//compare passwords with bcrypt.compare
//test for error or result
//if result 
//then 
//create token with jwt.sign
//send back in our payload return token and name: user.firstName
 const email = user.email;
 const password = user.password;
 const token = jwt.sign({email: email, password: password}, process.env.jwt_key, {} );

 res.status(200).json({message: 'Secured', token: token});
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
    .catch(err => {
        res.status(500).json({error: err.message});
    });
});



//PROFILE
router.get('/profile', checkAuth, (req, res, next) => {
   res.status(200).json({message: req.userData});
    
});

module.exports = router;