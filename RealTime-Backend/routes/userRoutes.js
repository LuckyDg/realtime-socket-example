const express = require('express');
const { createUser, getUserCount } = require('../controllers/userController');

const router = express.Router();

router.post('/users', createUser);
router.get('/users/count', getUserCount);

module.exports = router;
