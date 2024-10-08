const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
const { connectDB } = require("../config/MongoDB");
const userRoutes = require('../routes/userRoutes');
const paymentRoutes = require('../routes/paymentRoutes')
const orderRoutes = require('../routes/orderRoutes')
// middleware
app.use(cors());
app.use(express.json());

// Database connection
connectDB();

app.use('/',
    userRoutes,
    paymentRoutes,
    orderRoutes,
);


app.get('/', (req, res) => {
    res.send('44 pro server is running...');
})
app.listen(port, () => {
    console.log(`44 pro server is running on port:${port}`);
})

module.exports = app;