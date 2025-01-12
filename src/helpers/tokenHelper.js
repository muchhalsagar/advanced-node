const jwt = require('jsonwebtoken');

//generate tokne
exports.generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_TOKEN, {
        expiresIn: '2h',
    });
};
