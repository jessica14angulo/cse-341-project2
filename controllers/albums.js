const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async(req, res) => {
    //#swagger.tags=['Albums']
    const result = await mongodb.getDatabase().db().collection('albums').find();
        result.toArray().then((albums) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(albums);
    });
};

const getSingle = async(req, res) => {
    //#swagger.tags=['Albums']
    const albumId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('albums').find({_id: albumId });
        result.toArray().then((albums) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(albums[0]);
    });
};

const createAlbum = async (req,res) => {
    //#swagger.tags=['Albums']
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
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while creating the album');
    }
}

const updateAlbum = async (req, res) => {
    //#swagger.tags=['Albums']
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
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while updating this album');
    }
};

const deleteAlbum = async (req, res) => {
    //#swagger.tags=['Albums']
    const albumId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('albums').deleteOne({_id: albumId});
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while deleting this album');
    }
};

module.exports = {
    getAll,
    getSingle,
    createAlbum,
    updateAlbum,
    deleteAlbum
}