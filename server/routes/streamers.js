const express = require('express');
const router = express.Router();
const streamersController = require('../controllers/streamersController')
const satoshiController = require('../controllers/satoshiController')
const slotsController = require('../controllers/slotsController')

// Rutas del proyecto
router.get('/', streamersController.home);
router.get('/streamer/:id', streamersController.showStreamer);

// Ruta Satoshi
router.get('/satoshi', satoshiController.index);

// Ruta Slots
router.get('/slots', slotsController.index);

module.exports = router;