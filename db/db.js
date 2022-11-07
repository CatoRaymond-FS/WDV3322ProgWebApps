//use user model
const User = require('../api/models/user');
//findUser by email address {email: req.body.email}
const findUser = async (email) => {
    return await user.findOne({ email: email });
};
    


//if user exists return 409 message "User already exists"
const saveUser = async (newUser) => {
    return await newUser.save();
};



module.exports = { findUser, saveUser};