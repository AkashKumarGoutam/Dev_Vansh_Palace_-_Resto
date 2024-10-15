const mongoose = require("mongoose");

// Define the booking schema with validation
const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    selectedDate: {
        type: Date,
        required: true,
    },
    purpose: {
        type: String,
        required: true,
    },
    selectedServices: {
        catering: {
            type: Boolean,
            required: true,
        },
        musicSystem: {
            type: Boolean,
            required: true,
        },
        makeUpServices: {
            type: Boolean,
            required: true,
        }
    }
});

// Create the model based on the schema
const bookingModel = mongoose.model("Booking", bookingSchema);

module.exports = bookingModel;
