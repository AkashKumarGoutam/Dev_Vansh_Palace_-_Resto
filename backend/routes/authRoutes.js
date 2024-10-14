const express = require("express");
const httpStatus = require("http-status");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key"; // Use environment variables in production

// POST: Create account
router.post("/create_account", async (req, res) => {
    const { name, email, password } = req.body;

    // Validate inputs
    if (!name || !email || !password) {
        return res.status(httpStatus.BAD_REQUEST).send({ message: "Please fill all fields" });
    }

    try {
        // Check if the user already exists
        const check_user = await userModel.findOne({ email });
        if (check_user) {
            return res.status(httpStatus.BAD_REQUEST).send({ message: "Account already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const addUser = await userModel.create({ name, email, password: hashedPassword });
        return res.status(httpStatus.CREATED).json({ message: "Account created successfully", user: addUser });
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Error creating account", error });
    }
});

// POST: Login account and store token in cookies
router.post("/login_account", async (req, res) => {
    const { email, password } = req.body;

    // Validate inputs
    if (!email || !password) {
        return res.status(httpStatus.BAD_REQUEST).send({ message: "Please fill all fields" });
    }

    try {
        // Check if the user exists
        const check_user = await userModel.findOne({ email });
        if (!check_user) {
            return res.status(httpStatus.BAD_REQUEST).send({ message: "Account doesn't exist. Please register." });
        }

        // Compare passwords
        const isPasswordMatch = await bcrypt.compare(password, check_user.password);
        if (!isPasswordMatch) {
            return res.status(httpStatus.UNAUTHORIZED).send({ message: "Invalid email or password" });
        }

        // Generate JWT token
        const token = jwt.sign({ username: check_user.username, email: check_user.email }, JWT_SECRET, { expiresIn: "1h" });

        // Store token in cookies
        res.cookie('token', token, {
            httpOnly: true, // JavaScript cannot access the token
            maxAge: 3600000, // 1 hour
            sameSite: 'Lax', // For development; use 'None' with secure in production
            secure: process.env.NODE_ENV === 'production', // Set to true in production
        });

        return res.status(httpStatus.OK).json({ message: "Login successful" });
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Error during login", error });
    }
});

// POST: Logout and clear token from cookies
router.post("/logout", (req, res) => {
    res.clearCookie("token");
    return res.status(httpStatus.OK).json({ message: "Logout successful" });
});

// Protected Route example
router.get("/protected", (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(httpStatus.FORBIDDEN).send({ message: "No token provided." });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(httpStatus.UNAUTHORIZED).send({ message: "Failed to authenticate token." });
        }

        return res.status(httpStatus.OK).send({ message: "Access granted to protected route", user: decoded });
    });
});

module.exports = router;
