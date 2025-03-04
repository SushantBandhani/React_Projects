const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("✅ MongoDB connected");
    } catch (err) {
        console.error("❌ Error connecting to MongoDB:", err);
        process.exit(1); // Exit the process on failure
    }
};

// Defining event listeners
mongoose.connection.on("connected", () => {
    console.log("✅ Connected to MongoDB Server");
});
mongoose.connection.on("error", (err) => {
    console.error("❌ MongoDB connection error:", err);
});
mongoose.connection.on("disconnected", () => {
    console.warn("⚠️ MongoDB disconnected");
});

module.exports = connectDB;
