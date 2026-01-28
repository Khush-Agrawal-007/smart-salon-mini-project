import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/smart-salon';

// Database Connection
console.log(`[DEBUG] Attempting to connect to MongoDB at: ${MONGO_URI}`);
mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log('✅ MongoDB Connected Successfully');
        try {
            app.listen(PORT, () => {
                console.log(`🚀 Server running on port ${PORT}`);
            });
        } catch (e) {
            console.error('❌ Express failed to listen:', e);
        }
    })
    .catch((err) => {
        console.error('❌ MongoDB Connection Error:', err);
        process.exit(1);
    });

// Handle generic uncaught exceptions
process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: any) => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    // Ideally, we close the server typically before exit, but for now:
    process.exit(1);
});
