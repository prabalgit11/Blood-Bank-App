const express = require('express');
const { registerController,
    loginController,
    getCurrentUserController } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

//REGISTER || POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

// GET CURRENT USER || GET
router.get('/current-user', authMiddleware, getCurrentUserController)

module.exports = router;