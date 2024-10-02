const { getDB } = require('./../config/MongoDB');
const bcrypt = require('bcrypt');

// Database Collections...
const usersCollection = getDB("Ecommerce44pro").collection("users");

const userRegister = async (req, res) => {
    const userData = req.body;
    try {
        const { email } = userData;
        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exist, please login" });
        }

        const hashedPasswprd = await bcrypt.hash(userData.password, 10);
        userData.password = hashedPasswprd;
        userData.role = 'user'; //Default role will user
        const result = await usersCollection.insertOne(userData);
        res.status(200).json({ message: 'User registred successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Registred failed', error });
    }
};

const userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        };

        const user = await usersCollection.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const matchPassword = await bcrypt.compare(password, user.password);
        if (matchPassword) {
            // TODO JWT TOKEN
            res.status(200).json({ message: 'Login successful'});
        } else {
            res.status(401).json({ message: 'Invalid user or password' });
        }

    } catch (error) {
        res.status(500).json({ message: 'Failed to login', }, error.message);
    }
}

module.exports = { userRegister, userLogin }