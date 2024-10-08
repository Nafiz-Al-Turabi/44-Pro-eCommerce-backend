const { getDB } = require('../../config/MongoDB');

const ordersCollection = getDB("Ecommerce44pro").collection("orders");


const createOrderIntoDB = async (customerData, cartItems) => {
    if (!customerData || !cartItems) {
        return res.status(400).json({ message: 'Customer data and cart items are required' });
    }
    const newOrder = {
        cartItems,
        customerData,
        createdAt: new Date()
    }
    const result = await ordersCollection.insertOne(newOrder);
    return result
}


const getOrderFromDb = async () => {
    const result = await ordersCollection.find().toArray();
    return result
}

module.exports = { createOrderIntoDB, getOrderFromDb }
