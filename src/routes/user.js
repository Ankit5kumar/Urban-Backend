const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController');
const upload = require('../utils/upload');
const auth = require('../middlewares/authMiddleware');


router.put('/profile-image',auth.authenticateToken,upload.single('image'),userController);
module.exports = router;