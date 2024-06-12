const jwt = require('jsonwebtoken');
const httpStatusText = require('../utils/httpStatusText');
const appError = require('../utils/appError');

const verifyToken = (req,res,next) => {
    const authHeader = req.headers['Authorization'] || req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    
    if (!authHeader) {
        const error = appError.create('token is required', 401, httpStatusText.ERROR);
        return next(error);
    }
    
    try{
        jwt.verify(token, process.env.JWT_SECRET_KEY);
        next();
    } catch (err){
        const error = appError.create('Invalid token', 401, httpStatusText.ERROR);
        return next(error);
    }
}

module.exports = verifyToken;