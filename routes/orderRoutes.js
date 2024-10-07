const express = require('express');
const { orders } = require('../controllers/orderController');
const router = express.Router();

router.post('/orders', orders);


module.exports = router