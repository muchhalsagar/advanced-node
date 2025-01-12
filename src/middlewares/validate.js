const { errorResponse } = require('../helpers/responseHelper');
const { isValidEmail, isValidPhone, isValidPassword } = require('../utils/validationUtils');

exports.validateRegister = (req, res, next) => {
    const { firstName, lastName, email, password, phone } = req.body;

    // Check if all required fields are present
    if (!firstName || !lastName || !email || !password || !phone) {
        return errorResponse(res, 'All fields are required', 400);
    }

    // Validate email
    if (!isValidEmail(email)) {
        return errorResponse(res, 'Invalid email format', 400);
    }

    // Validate phone number
    if (!isValidPhone(phone)) {
        return errorResponse(res, 'Phone number must be 10 digits long', 400);
    }

    // Validate password
    if (!isValidPassword(password)) {
        return errorResponse(res, 'Password must be at least 6 characters long', 400);
    }

    next();
};

exports.validateLogin = (req, res, next) => {
    const { email, password } = req.body;

    // Check if all required fields are present
    if (!email && !password) {
        return errorResponse(res, 'All fields are required', 400);
    }

    // Validate email
    if (!isValidEmail(email)) {
        return errorResponse(res, 'Invalid email format', 400);
    }

    // Validate password
    if (!isValidPassword(password)) {
        return errorResponse(res, 'Password must be at least 6 characters long', 400);
    }

    next();
};