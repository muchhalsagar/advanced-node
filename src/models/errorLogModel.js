const mongoose = require('mongoose');

const errorLogSchema = new mongoose.Schema(
    {
        errorNote: { type: String, required: true },
        message: { type: String, required: true },
        stack: { type: String },
        method: { type: String },
        endpoint: { type: String },
        createdAt: { type: Date, default: Date.now }
    }
);

module.exports = mongoose.model('ErrorLog', errorLogSchema);