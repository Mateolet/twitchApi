const express = require('express');
const router = express.Router();
const streamersController = require('../controllers/streamersController')

// Rutas del proyecto
router.get('/', streamersController.home);

module.exports = router;