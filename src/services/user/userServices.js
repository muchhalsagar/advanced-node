const User = require('../../models/userModel');

// Check for exsting user
exports.checkExistingUser = async (email, phone) => {
    return await User.findOne({ $or: [{ email }, { phone }] });
};

// Create a new user
exports.createUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
};

// Find user by Email
exports.findUserByEmail = async (email) => {
    return await User.findOne({ email });
}

// Find user by reset token
exports.findUserByResetToken = async (resetToken) => {
    return await User.findOne({ resetToken });
};

// Update user's password and clear reset token fields
exports.updateUserPassword = async (userId, updates) => {
    return await User.findByIdAndUpdate(userId, updates, { new: true });
};