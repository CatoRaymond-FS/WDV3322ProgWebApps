const connect = async () => {
    console.log("mocked connection");
}

const disconnect = async () => {
    console.log("mocked disconnection");
}

const findUser = async (email) => {
    return await user.findOne({ email: 'jd@gmail.com' });
}

const saveUser = async (newUser) => {
    return await newUser.save({firstName: 'John'});
    
}

module.exports = { connect, findUser, saveUser, disconnect};

