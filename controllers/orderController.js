const express = require('express');
const { getDB } = require('../config/MongoDB');
const ordersCollection = getDB("Ecommerce44pro").collection("orders");
const { createOrderIntoDB, getOrderFromDb } = require("../service/orderService/orderService")


const orders = async (req, res) => {
    try {
        const { customerData, cartItems } = req?.body;
        await createOrderIntoDB(customerData, cartItems);
        res.status(200).json({ message: 'Order saved successfully'});

    } catch (error) {
        console.error('Error saving order:', error);
        res.status(500).json({ message: 'Failed to save order', error: error.message });
    }
}



const getOrders = async (req, res) => {
    const result = await getOrderFromDb()
    res.send(result)
}

module.exports = { orders, getOrders }