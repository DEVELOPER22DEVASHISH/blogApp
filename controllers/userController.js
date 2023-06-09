const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const BASE_URL = process.env.BASE_URL

// create register user
exports.registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body
        // validation
        if (!username || !email || !password) {
            return res.status(400).send({
                success: false,
                message: 'Please Fill all Fields'
            });
        }

        // existing user
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(401).send({
                success: false,
                message: 'user already exist'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        // password = hashedPassword

        // save new user
        const user = new userModel({ username, email, password: hashedPassword });
        await user.save();
        return res.status(201).send({
            success: true,
            message: 'New User Created'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: 'Error in Register callback',
            success: false,
            error
        });
    }
};

// get all user
exports.getAllUser = async (_req, res) => {
    try {
        const users = await userModel.find({})
        return res.status(200).send({
            userCount: users.length,
            success: true,
            message: 'all users data',
            users
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error in Get All Users',
            error
        });
    }
};



// login
exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        //   validation
        if (!email || !password) {
            return res.status(401).send({
                success: false,
                message: 'Please provide email or password'
            });
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(200).send({
                success: false,
                message: 'email is not registered'
            });
        }
        // password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: 'Invalid Username or Password'
            });
        }
        return res.status(200).send({
            success: true,
            message: 'Login Successfully',
            user
        });

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error in Login Callback',
            error
        });
    }
};