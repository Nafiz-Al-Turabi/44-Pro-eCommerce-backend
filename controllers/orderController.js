const express = require('express');
const { getDB } = require('../config/MongoDB');
const ordersCollection = getDB("Ecommerce44pro").collection("orders");

const orders = async (req, res) => {
    try {
        const { customerData, cartItems } = req.body;
        if (!customerData || !cartItems) {
            return res.status(400).json({ message: 'Customer data and cart items are required' });
        }
        const newOrder = {
            cartItems,
            customerData,
            createdAt: new Date()
        }
        await ordersCollection.insertOne(newOrder);
        res.status(201).json({ message: 'Order saved successfully', orderId: newOrder._id });
    } catch (error) {
        console.error('Error saving order:', error);
        res.status(500).json({ message: 'Failed to save order', error: error.message });
    }
}

module.exports = {orders}