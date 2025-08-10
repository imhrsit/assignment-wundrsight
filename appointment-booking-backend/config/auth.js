const jwt = require('jsonwebtoken');

const JWT_SECRET = 'default_jwt_secret'; // Use a strong secret in production

function authMiddleware(role) {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(401).json({ error: 'Missing token' });
        const token = authHeader.split(' ')[1];
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            if (role && decoded.role !== role) {
                return res.status(403).json({ error: 'Forbidden' });
            }
            req.user = decoded;
            next();
        } catch (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }
    };
}

function generateToken(user) {
    return jwt.sign({ id: user._id, role: user.role, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
}

module.exports = { authMiddleware, generateToken };
