const express = require('express');
const { payment } = require('../controllers/paymentController');
const router = express.Router();

router.post('/create-payment-intent', payment);


module.exports = router
