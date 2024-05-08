const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async(req, res) => {
    //#swagger.tags=['Books']
    const result = await mongodb.getDatabase().db().collection('books').find();
        result.toArray().then((books) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(books);
    });
};

const getSingle = async(req, res) => {
    //#swagger.tags=['Books']
    const bookId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('books').find({_id: bookId });
        result.toArray().then((books) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(books[0]);
    });
};

const createBook = async (req,res) => {
    //#swagger.tags=['Books']
    const book = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        isbn: req.body.isbn,
        language: req.body.language,
        pages: req.body.pages,
        publishedYear: req.body.publishedYear
    };
    const response = await mongodb.getDatabase().db().collection('books').insertOne(book);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while creating the book');
    }
}

const updateBook = async (req, res) => {
    //#swagger.tags=['Books']
    const bookId = new ObjectId(req.params.id);
    const book = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        isbn: req.body.isbn,
        language: req.body.language,
        pages: req.body.pages,
        publishedYear: req.body.publishedYear
    };
    const response = await mongodb.getDatabase().db().collection('books').replaceOne({_id: bookId}, book);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while updating this book');
    }
};

const deleteBook = async (req, res) => {
    //#swagger.tags=['Books']
    const bookId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('books').deleteOne({_id: bookId});
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while deleting this book');
    }
};

module.exports = {
    getAll,
    getSingle,
    createBook,
    updateBook,
    deleteBook
}