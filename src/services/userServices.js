const User = require('../models/userModel');

exports.checkExistingUser = async (email, phone) => {
    return await User.findOne({ $or: [{ email }, { phone }] });
};

exports.createUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
};
