const { createErrorLog } = require('../../services/log/logServices');

const logError = async (errorNote, error, req = null) => {
    try {
        const errorData = {
            errorNote,
            message: error.message,
            stack: error.stack,
            method: req?.method || "N/A",
            endpoint: req?.originalUrl || "N/A",
            statusCode: req?.statusCode || 500,
            ip: req?.ip || "N/A",
        };

        await createErrorLog(errorData);
        console.log("✅ Error logged successfully:", errorNote);
    } catch (logError) {
        console.error("❌ Error logging failed:", logError.message);
    }
};

module.exports = logError;
