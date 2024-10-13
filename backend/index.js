const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./database/db");
const cookieParser = require("cookie-parser");


const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());


connectDB(); // Connect to MongoDB

// Authentication Routes
app.use("/auth", authRoutes);

app.listen(3001, () => {
    console.log("Listening on Port: 3001");
});
