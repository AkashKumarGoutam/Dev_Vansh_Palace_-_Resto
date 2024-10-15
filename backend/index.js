const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./database/db");
const dotenv = require("dotenv");
const bookDatesRoutes = require("./routes/bookDatesRoutes")
dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(morgan("dev"));
app.use(cors({
    origin: "http://localhost:5173", // Update this to match your frontend URL
    credentials: true, // Allow cookies to be sent and received
}));

app.use(cookieParser());

// Connect to MongoDB
connectDB();

// Authentication Routes
app.use("/auth", authRoutes);
app.use("/booking" , bookDatesRoutes)

// Start the server
app.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}`);
});
