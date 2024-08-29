const jwt = require('jsonwebtoken');
const httpStatusText = require('../utils/httpsStatusText');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['Authorization'] || req.headers['authorization'];
    if(!authHeader) {
        return res.status(401).json({
            status: httpStatusText.FAIL,
            message: "unauthorized"
        })
    }

    const token = authHeader.split(' ')[1];
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        req.author = decodedToken;
        console.log(decodedToken)
        next();

    } catch (err) {
        return res.json({
            message: "interrrrrnal serrrrveer errrror"
        })
    }   
    
}

module.exports = verifyToken;