const validator = require('../helper/validate');

const saveAlbum = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    artist: 'required|string',
    songsNumber: 'required|integer',
    link: 'required|string',
    releaseDate: 'required|string',
    genre: 'required|string',
    labelName: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveBook = (req, res, next) => {
  const validationRule = {
    title: 'required|string',
    author: 'required|string',
    genre: 'required|string',
    isbn: 'required|string',
    language: 'required|string',
    pages: 'required|integer',
    publishedYear: 'required|integer'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveAlbum,
  saveBook
};