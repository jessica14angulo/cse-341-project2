const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async(req, res) => {
    //#swagger.tags=['Albums']
    try {
        const result = await mongodb.getDatabase().db().collection('albums').find();
        result.toArray().then((albums) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(albums);
    });
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
};

const getSingle = async(req, res) => {
    //#swagger.tags=['Albums']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid id to find the data!');
          }
        const albumId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('albums').find({_id: albumId });
        result.toArray().then((albums) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(albums[0]);
    });
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
};

const createAlbum = async (req,res) => {
    //#swagger.tags=['Albums']
    try {
        const album = {
            name: req.body.name,
            artist: req.body.artist,
            songsNumber: req.body.songsNumber,
            link: req.body.link,
            releaseDate: req.body.releaseDate,
            genre: req.body.genre,
            labelName: req.body.labelName 
        };
        const response = await mongodb.getDatabase().db().collection('albums').insertOne(album);
        if (response.acknowledged) { 
            console.log('Created successfully');
            res.setHeader('Content-Type', 'application/json');
            res.status(204).json(response);
        } else {
            res.status(500).json(response.error || 'An error ocurred while creating the album :(');
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
};

const updateAlbum = async (req, res) => {
    //#swagger.tags=['Albums']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid album id to update an album.');
          }
        const albumId = new ObjectId(req.params.id);
        const album = {
        name: req.body.name,
        artist: req.body.artist,
        songsNumber: req.body.songsNumber,
        link: req.body.link,
        releaseDate: req.body.releaseDate,
        genre: req.body.genre,
        labelName: req.body.labelName 
        };
        const response = await mongodb.getDatabase().db().collection('albums').replaceOne({_id: albumId}, album);
        if (response.modifiedCount > 0) {
            console.log('Updated successfully');
            res.setHeader('Content-Type', 'application/json');
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error ocurred while updating this album');
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
};

const deleteAlbum = async (req, res) => {
    //#swagger.tags=['Albums']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid album id to delete a album.');
          }
        const albumId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('albums').deleteOne({_id: albumId});
        if (response.deletedCount > 0) {
            console.log('Deleted successfully');
            res.setHeader('Content-Type', 'application/json');
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error ocurred while deleting this album');
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
};

module.exports = {
    getAll,
    getSingle,
    createAlbum,
    updateAlbum,
    deleteAlbum
}