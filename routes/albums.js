const express = require('express');
const router = express.Router();
const albumsController = require('../controllers/albums');
const validation = require('../middleware/validate');

router.get('/', albumsController.getAll);

router.get('/:id', albumsController.getSingle);

router.post('/', validation.saveAlbum, albumsController.createAlbum);

router.put('/:id', validation.saveAlbum, albumsController.updateAlbum);

router.delete('/:id', albumsController.deleteAlbum);

module.exports = router;