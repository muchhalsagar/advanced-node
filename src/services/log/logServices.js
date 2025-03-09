const ErrorLog = require("../../models/errorLogModel");

// Create a log entry
exports.createErrorLog = async (logData) => {
    const errorlog = new ErrorLog(logData);
    return await errorlog.save();
};