const express = require('express');
const { orders, getOrders } = require('../controllers/orderController');
const { verifyToken } = require('../JWT/jwt');
const router = express.Router();

router.post('/orders', orders);
router.get('/orders',verifyToken, getOrders);


module.exports = router