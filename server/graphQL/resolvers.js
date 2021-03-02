const books = require('./books.json');

const authors = require('./authors.json');

module.exports = {
  Query: {
    books: () => books,
    authors: () => authors,
  },

};
