const express = require('express');
const { userRegister, userLogin, getUser } = require('../controllers/userController');
const { verifyToken } = require('../JWT/jwt');
const router = express.Router();

router.post('/signup', userRegister);
router.post('/login', userLogin);
router.get('/user',verifyToken, getUser);

module.exports = router
