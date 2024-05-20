const {
  postBooks,
  getBooksByIdHandler,
  getBooks,
  updateBook,
  deleteBook,
  deleteBooks,
} = require("./handler");

const routes = [
  {
    method: "POST",
    path: "/books",
    handler: postBooks,
  },
  {
    method: "GET",
    path: "/books",
    handler: getBooks,
  },
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: getBooksByIdHandler,
  },
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: updateBook,
  },
  {
    method: "DELETE",
    path: "/books/{bookId}",
    handler: deleteBook,
  },
  {
    method: "delete",
    path: "/books",
    handler: deleteBooks,
  },
];

module.exports = routes;
