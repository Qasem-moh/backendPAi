const jwt = require('jsonwebtoken');

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
module.exports = {verifyToken,};