const jwt = require('jsonwebtoken');
const jwtSecretKey = process.env.SECRET_KEY;

// Ensure the secret key is defined
if (!jwtSecretKey) {
    throw new Error("SECRET_KEY is not defined in the environment variables");
}

function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;

    // Check if the Authorization header is present and properly formatted
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization header missing or malformed' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, jwtSecretKey);
        req.user = decoded;
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: 'Token has expired. Please log in again.' });
        } else if (error instanceof jwt.JsonWebTokenError) {
            return res.status(403).json({ message: 'Invalid token. Access denied.' });
        } else {
            console.error('Unexpected error during token verification:', error.stack || error);
            return res.status(500).json({ message: 'An internal server error occurred during token verification' });
        }
    }
}

module.exports = { verifyToken, jwtSecretKey };
