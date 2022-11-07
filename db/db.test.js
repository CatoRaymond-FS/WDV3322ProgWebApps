//db functions
//User model
//mongoose
const db = require('../db/db');
const User = require('../api/models/user');
const mongoose = require('mongoose');

//use mock db
jest.mock('../db/__mocks__/db.js'); 

beforeEach(async () =>{
    //call connect function
    await db.connect();
});


describe('User', () => {
    test('should create a new user', async () => {
        //create user with email, first name, password
        //save user
        //expect firstName, email, password
        const user = new User({
            _id: mongoose.Types.ObjectId(),
            firstName: 'John',
            lastName: 'Doe',
            address: '123 Main St',
            city: 'New York',
            state: 'NY',
            zip: '10001',
            email: 'jd@gmail.com',  
            password: 'password'
        });
        const savedUser = await db.saveUser(user);
        expect(savedUser.firstName).toBe('John');
        expect(savedUser.email).toBe('jd@gmail.com');
        expect(savedUser.password).toBe('password');
    });

    test('should find a user by first name', async () => {
        //create user with email, first name, password
        //save user
        //find user by first name
        //expect firstName, email, password
        const user = new User({
            _id: mongoose.Types.ObjectId(),
            firstName: 'John',
            lastName: 'Doe',
            address: '123 Main St',
            city: 'New York',
            state: 'NY',
            zip: '10001'
        });
        const savedUser = await db.saveUser(user);
        expect(savedUser.firstName).toBe('John');
});
});

afterEach(async () => {
    //call disconnect function
    await db.disconnect();
});
