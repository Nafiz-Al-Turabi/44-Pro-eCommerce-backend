const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRECT);

const payment = async (req, res) => {
    try {
        const { amount } = req.body;
        console.log(amount);

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { payment }