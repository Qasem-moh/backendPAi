const { func } = require('joi');
const jwt = require('jsonwebtoken');

// Verify Token Middleware
function verifyToken(req, res, next) {
    const token = req.headers.token

    if (token) {

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            res.status(400).json({ message: "Token is not valid" });
        }
    }
    else {
        res.status(401).json({ message: "no token provided" });
    }
}

// Verify Token and Authorization Middleware
function verifyTokenAndAuthorization(req, res, next) { 
    verifyToken(req, res, () => { 
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json({ message: "you can update only your account" });
        }
    });
}

// Verify Token and Admin Middleware
function verifyTokenAndAdmin(req, res, next) {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json({ message: "you are not allowed to do that" });
        }
    });
}

module.exports = {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin};