const { getDB } = require("../../config/MongoDB");

const usersCollection = getDB("Ecommerce44pro").collection("users");

const userRegisterIntoDB = async () => {

}

const userGetFromDB = async () => {
    const users = await usersCollection.find().toArray();
    res.status(200).json(users);
}

module.exports = {userGetFromDB}