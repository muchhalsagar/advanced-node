require('dotenv').config();

module.exports = {
    port: process.env.PORT || 4000,
    dbUri: process.env.DB_URI || 'mongodb://localhost:27017/mydb',
};