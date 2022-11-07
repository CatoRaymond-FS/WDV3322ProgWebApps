//use express
const express = require('express');
const app = express();
//use morgan
const morgan = require('morgan');
//import dotenv
require('dotenv').config();
//use mongoose
const mongoose = require('mongoose');
//use routes
const routes = require('../api/routes/routes');

//middleware for logging
app.use(morgan('dev'));

//parsing middleware
app.use(express.urlencoded({ extended: true}));

//middleware that all requests are json
app.use(express.json());

app.get("/",(req,res) => {
    res.status(201).json({
        message:"Service is up and running",
        method: req.method});
} );

//use cors module
const cors = require('cors');
app.use(cors());


app.use('/user', routes);

//error handling middleware using arrow functions
app.use((req, res, next) => {
    const error = new Error("NOT FOUND!!!");
    error.status = 404;
    next(error);
} );

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        error:{
            message: err.message,
            status: err.status
        }
    });
});

//connect to mongodb
mongoose.connect(process.env.mongoDBURL, (err) => {
    if(err){
        console.log(err);
    }else{
        console.log("Connected to mongodb");
    }
});

//export
module.exports = app;