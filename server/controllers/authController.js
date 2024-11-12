
const User = require('../models/user');
const { hashpassword, comparepassword } = require('../helpers/auth');  
const jwt = require('jsonwebtoken');

// Test endpoint
const test = (req, res) => {
    res.json('test is working');
};

// Register endpoint
const registerUser = async (req, res) => {
    try {
        console.log(req.body);
        const { name, email, password } = req.body;

        if (!name) {
            return res.status(400).json({
                error: 'Name is required'
            });
        }

        if (!password || password.length < 6) {
            return res.status(400).json({
                error: 'Password required & should be at least 6 characters'
            });
        }

        const exist = await User.findOne({ email });
        if (exist) {
            return res.status(400).json({
                error: 'Email is already taken'
            });
        }

        console.log('1');

        const hashedPassword = await hashpassword(password);
        console.log('2');

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            message: 'User registered successfully',
            user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Server error',
        });
    }
};

// Login endpoint
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                error: 'No user found'
            });
        }
        console.log('3');

        
        const match = await comparepassword(password, user.password);
        console.log(match)
        if (match) {
            jwt.sign(
                { email: user.email, id: user._id, name: user.name },
                process.env.JWT_SECRET,
                { expiresIn: '1h' },
                (err, token) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).json({ error: 'Token generation failed' });
                    }
                    console.log(token)
                    return res.cookie('token', token, { httpOnly: true, secure: true }).json(user);
                }
            );
        } else {
           return res.status(400).json({ error: 'Passwords do not match' });
        }

        console.log('4');
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Server error'
        });
    }
};

// Get profile endpoint
const getProfile = (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if (err) {
                return res.status(403).json({ error: 'Invalid token' });
            }
            res.json(user);
        });
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile
};
