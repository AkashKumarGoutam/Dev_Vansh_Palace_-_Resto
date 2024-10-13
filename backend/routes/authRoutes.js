const express = require("express");
const httpStatus = require("http-status");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const router = express.Router();
const JWT_SECRET = "your_jwt_secret_key"; // Use an environment variable for this in production

// POST: Create account
router.post("/create_account", async (req, res) => {
    const { name, email, password } = req.body;

    // Check if all fields are filled
    if (!name || !email || !password) {
        return res.status(httpStatus.BAD_REQUEST).send({ message: "Please fill all fields" });
    }

    // Check if the user already exists
    const check_user = await userModel.findOne({ email });
    if (check_user) {
        return res.status(httpStatus.BAD_REQUEST).send({ message: "Account already exists" });
    }

    // Hash password before saving to database
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    try {
        const addUser = await userModel.create({ name, email, password});
        return res.status(httpStatus.OK).json({ message: "Account created successfully", user: addUser });
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Error creating account", error });
    }
});

// POST: Login account and store token in cookies
router.post("/login_account", async (req, res) => {
    const { email, password } = req.body;

    // Check if all fields are filled
    if (!email || !password) {
        return res.status(httpStatus.BAD_REQUEST).send({ message: "Please fill all fields" });
    }

    // Check if the user exists
    const check_user = await userModel.findOne({ email });
    if (!check_user) {
        return res.status(httpStatus.BAD_REQUEST).send({ message: "Account doesn't exist. Please register." });
    }

    // Compare passwords
    // const isPasswordMatch = await bcrypt.compare(password, check_user.password);
    // if (!isPasswordMatch) {
    //     return res.status(httpStatus.UNAUTHORIZED).send({ message: "Invalid email or password" });
    // }

    // Generate JWT token
    const token = jwt.sign({ id: check_user._id, email: check_user.email }, JWT_SECRET, { expiresIn: "1h" });

    // Store token in cookies
    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 }); // 1 hour expiry

    return res.status(httpStatus.OK).json({ message: "Login successful" });
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
