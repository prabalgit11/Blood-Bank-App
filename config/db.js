const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected To MongoDB ${mongoose.connection.host}`);

    } catch (error) {
        console.log(`Mongoose Data Base Error ${error}`);
    }
}

module.exports = connectDB;