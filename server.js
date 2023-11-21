const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
dotenv.config();

//mongoDB
connectDB();
// rest object
const app = express();

//middelware
app.use(express.json());
app.use(cors());

//port
const PORT = process.env.PORT

// 1 test route
app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/inventory", require("./routes/inventoryRoutes"))

// listen
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})