const app = require('./app');
const connectDB = require('./config/db');
const { port } = require('./config/index');

const startServer = async () => {
    try {
        // Connect to Database
        await connectDB();

        // Start the Server
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Failed to start the server:', error.message);
    }
};

startServer();
