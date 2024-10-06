const { jwtSecretKey } = require('../JWT/jwt');
const { getDB } = require('./../config/MongoDB');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 

// Database Collections...
const usersCollection = getDB("Ecommerce44pro").collection("users");

const userRegister = async (req, res) => {
    const userData = req.body;
    try {
        const { email } = userData;
        const existingUser = await usersCollection.findOne({ email });
        
        if (existingUser) {
            return res.status(409).json({ message: "User already exists, please login" });
        }
        // Hashing password
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        userData.password = hashedPassword;
        userData.role = 'user'; // Default role will be 'user'
        
        const result = await usersCollection.insertOne(userData);
        res.status(200).json({ message: 'User registered successfully.' });
        
    } catch (error) {
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
};

const userLogin = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await usersCollection.findOne({ email });
        
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const matchPassword = await bcrypt.compare(password, user.password);
        
        if (matchPassword) {
            const token = jwt.sign({ email: user.email, id: user._id, role: user.role }, jwtSecretKey, { expiresIn: '24h' });
            return res.status(200).json({ 
                message: 'Login successful', 
                token 
            });
        } else {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

    } catch (error) {
        res.status(500).json({ message: 'Failed to login', error: error.message });
    }
};

const getUser = async (req, res) => {
    try {
        const users = await usersCollection.find().toArray();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get user data', error: error.message });
    }
};

module.exports = { userRegister, userLogin, getUser };
