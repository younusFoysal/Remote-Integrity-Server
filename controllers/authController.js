import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';


export const registerUser = async (req, res) => {
    try {
        const {user_name, user_email, user_password} = req.body;
        const existingUser = await User.findOne({user_email});

        if (existingUser) {
            return res.status(400).json({message: 'User already exists'});
        }

        const hashedPassword = await bcrypt.hash(user_password, 10);
        const newUser = new User({user_name, user_email, user_password: hashedPassword});

        await newUser.save();
        res.status(201).json({message: 'User registered successfully'});

    } catch (error) {
        res.status(500).json({message: 'Internal server error'});
    }
};

export const loginUser = async (req, res) => {
    try {
        const {user_email, user_password} = req.body;
        const user = await User.findOne({user_email});

        if (!user || !(await bcrypt.compare(user_password, user.user_password))) {
            return res.status(401).json({message: 'Invalid credentials'});
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.json({token, user});

    } catch (error) {
        res.status(500).json({message: 'Internal server error'});
    }
};


export const logoutUser = (req, res) => {
    req.logout();
    res.json({message: 'Logged out successfully'});
};

export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-user_password');
        res.json(user);
    }catch (error){
        res.status(500).json({message: 'Internal server error'});
    }
};