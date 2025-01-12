const crypto = require('crypto');
const { successResponse, errorResponse } = require('../helpers/responseHelper');
const {
    checkExistingUser,
    createUser,
    findUserByEmail,
    findUserByResetToken,updateUserPassword,
} = require('../services/userServices');
const transporter = require('../config/email');
const { generateEmailTemplateForRegister, resetPasswordTemplate } = require('../helpers/emailHelper');
const { generateToken } = require('../helpers/tokenHelper');
const { isValidEmail, isValidPassword } = require('../utils/validationUtils');

/*******************************************************
 * @desc Handles user registration
 * @route POST /register
 * @access Public
 *******************************************************/
exports.register = async (req, res) => {
    try {
        /****************** Step 1: Extract Request Body **********************/
        const { firstName, lastName, email, password, phone, role } = req.body;

        /****************** Step 2: Check for Existing User *******************/
        const existingUser = await checkExistingUser(email, phone);
        if (existingUser) {
            return errorResponse(res, 'Email or phone already registered', 400);
        }

        /****************** Step 3: Create and Save User ******************/
        const user = await createUser({ firstName, lastName, email, password, phone, role });

        /****************** Step 4: Send Welcome Email *************************/
        const emailTemplate = generateEmailTemplateForRegister(firstName, email);
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Welcome to Our App!',
            html: emailTemplate,
        });

        /****************** Step 5: Send Success Response ***************/
        return successResponse(res, 'User registered successfully', {
            id: user._id,
        });
    } catch (error) {
        /****************** Step 6: Handle Errors ******************/
        console.error(error);
        return errorResponse(res, 'Internal server error', 500);
    }
};

/********************************************
 * @desc Handles the user Sign-in process.
 * @route POST /login
 * @access Public
 ********************************************/
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try{
        /****************** Step 1: Fetch User by Email ******************/
        const user = await findUserByEmail(email);

        if (!user) {
            return errorResponse(res, 'Invalid email or password', 401);
        }

        /****************** Step 2: Validate Password ******************/
        if (password !== user.password) {
            return errorResponse(res, 'Invalid email or password', 401);
        }

        /************** Step 3: Generate Authentication Token **************/
        const token = await generateToken({ id: user._id, role: user.role });

        /*************** Step 4: Send Success Response ***************/
        return successResponse(res, 'Login successful.', {token});
    } catch(error) {
        /****************** Step 5: Handle Errors ******************/
        console.log('Error : ', error);
        return errorResponse(res, 'Internal Server error', 500);
    }
}

/********************************************
 * @desc Handles the Forgot password process.
 * @route POST /forgot-password
 * @access Public
 ********************************************/
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        /****************** Step 1: Validate Input ******************/
        if (!email) {
            return errorResponse(res, 'Email is required.', 400);
        }

        // Validate email
        if (!isValidEmail(email)) {
            return errorResponse(res, 'Invalid email format', 400);
        }

        /****************** Step 2: Check if User Exists ******************/
        const user = await findUserByEmail(email);
        if (!user) {
            return errorResponse(res, 'No user found with this email address', 400);
        }

        /****************** Step 3: Generate Reset Token ******************/
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = Date.now() + 3600000; // 1 hour expiration time

        user.resetToken = resetToken;
        user.resetTokenExpiry = resetTokenExpiry;
        await user.save();
        
        /****************** Step 4: Send Reset Email ******************/
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
        const emailTemplate = resetPasswordTemplate(resetUrl);
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Password Reset Request',
            html: emailTemplate,
        });

        /****************** Step 5: Send Success Response ******************/
        return successResponse(res, 'Password reset link has been sent to your email.', {});
    } catch(error) {
        /****************** Step 6: Handle Errors ******************/
        console.log('error : ', error);
        return errorResponse(res, 'Internal Server error.', 500);
    }
}

/********************************************
 * @desc Handles the password reset process.
 * @route POST /reset-password
 * @access Public
 ********************************************/
exports.resetPassword = async (req, res) => {
    const { resetToken, newPassword } = req.body;

    try {
        /***************** Step 1: Input Validation *****************/
        if (!resetToken || !newPassword) {
            return errorResponse(res, 'Reset token and new password are required.', 400);
        }

        if (!isValidPassword(newPassword)) {
            return errorResponse(
                res,
                'Password must be at least 6 characters long and meet security requirements.',
                400
            );
        }

        /***************** Step 2: Verify Reset Token *****************/
        // Fetch the user associated with the reset token
        const user = await findUserByResetToken(resetToken);
        if (!user) {
            return errorResponse(res, 'Invalid or expired reset token.', 400);
        }
        if (user.resetTokenExpiry < Date.now()) {
            return errorResponse(res, 'Reset token has expired. Please request a new one.', 400);
        }

        /***************** Step 3: Update Password *****************/
        await updateUserPassword(user._id, {
            password: newPassword,
            resetToken: null,
            resetTokenExpiry: null, 
        });

        /***************** Step 4: Send Success Response *****************/
        return successResponse(res, 'Your password has been successfully updated.', {});
    } catch (error) {
        /***************** Step 5: Error Handling *****************/
        console.error('Reset Password Error:', error);
        return errorResponse(res, 'An internal server error occurred. Please try again later.', 500);
    }
};
