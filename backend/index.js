require("dotenv").config(); // For environment variables
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./database/db");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(morgan("dev"));
app.use(cors({
    origin: "http://localhost:5174", // Your frontend origin
    credentials: true, // Allow cookies across origins
}));
app.use(cookieParser());

// Connect to MongoDB
connectDB();

// Authentication Routes
app.use("/auth", authRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}`);
});
