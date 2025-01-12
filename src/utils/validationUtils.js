// Validate email format
exports.isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
  
// Validate phone format (10 digits)
exports.isValidPhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
};

// Validate password (minimum length: 6 characters)
exports.isValidPassword = (password) => {
    return password.length >= 6;
};
  