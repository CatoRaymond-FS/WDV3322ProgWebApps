//use user model
const user = require('../api/models/user');
const mongoose = require('mongoose');
require('dotenv').config();


const findUser = async (object) => {
    return await user.findOne(object);

};
    


const saveUser = async (newUser) => {
    return await newUser.save();
};

const connect = async () => {
    await mongoose.connect(process.env.mongoDBURL);
};

const disconnect = async () => {
   await mongoose.connection.close();
}

module.exports = { connect, findUser, saveUser, disconnect};