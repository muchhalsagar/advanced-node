const { successResponse, errorResponse } = require('../helpers/responseHelper');
const { checkExistingUser, createUser } = require('../services/userServices');
const transporter = require('../config/email');
const { generateEmailTemplate } = require('../helpers/emailHelper');

// Register a new user
exports.register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, phone, role } = req.body;

        // Check if email or phone already exists
        const existingUser = await checkExistingUser(email, phone);
        if (existingUser) {
            return errorResponse(res, 'Email or phone already registered', 400);
        }

        // Save user to database
        const user = await createUser({ firstName, lastName, email, password, phone, role });

        const emailTemplate = generateEmailTemplate(firstName, email);
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Welcome to Our App!',
            html: emailTemplate,
        });

        return successResponse(res, 'User registered successfully', {
            id: user._id,
        });
    } catch (error) {
        console.error(error);
        return errorResponse(res, 'Internal server error', 500);
    }
};
