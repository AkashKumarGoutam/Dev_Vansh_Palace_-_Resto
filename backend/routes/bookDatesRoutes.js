const express = require("express");
const httpStatus = require("http-status");
const bookingModel = require("../models/bookDatesModels");

const router = express.Router();

// Handle POST requests to save a booking
router.post('/bookDate', async (req, res) => {
    try {
        const { name, address, phone, selectedDate, purpose, selectedServices } = req.body;

        // Check if any required field is missing
        if (!name || !address || !phone || !selectedDate || !purpose || !selectedServices) {
            return res.status(httpStatus.BAD_REQUEST).send({ message: "Please fill all fields" });
        }

        // Create a new booking document
        const booking = await bookingModel.create({
            name,
            address,
            phone,
            selectedDate,
            purpose,
            selectedServices
        });

        // Send a success response
        res.status(httpStatus.CREATED).json({
            message: "Booking saved successfully!",
            booking
        });
    } catch (error) {
        console.error("Error saving booking:", error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "Failed to save booking" });
    }
});

module.exports = router;
