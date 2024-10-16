const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb://127.0.0.1:27017/Deo_Vansh_Palace_&_Resto", {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log(`Database connected: ${conn.connection.name}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectDB;
