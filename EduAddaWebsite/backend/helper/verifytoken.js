// helper/verifytoken.js
const jwt = require('jsonwebtoken');
const secret = "RESTAPI";

const checkToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ error: 'No token provided' });
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to authenticate token' });
        }

        req.user = decoded;
        next();
    });
};

module.exports = checkToken;
