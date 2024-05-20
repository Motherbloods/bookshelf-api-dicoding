const books = require("./books");
const { nanoid } = require("nanoid");

const postBooks = async (req, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;

  if (!name) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }

  const id = nanoid(10);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  const isSucces = books.filter((book) => book.id === id).length > 0;

  if (isSucces) {
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  } else {
    const response = h.response({
      status: "fail",
      message: "Buku gagal ditambahkan",
    });
    response.code(500); // Internal Server Error
    return response;
  }
};

// const getBooks = async (req, h) => {
//   if (books && books.length > 0) {
//     return {
//       status: "success",
//       data: books,
//     };
//   } else {
//     return {
//       status: "success",
//       data: [],
//     };
//   }
// };
const getBooks = async (req, h) => {
  const { name, reading, finished } = req.query;
  if (!name && !reading && !finished) {
    const responseData = {
      status: "success",
      data: {
        books: books.map(({ id, name, publisher }) => ({
          id,
          name,
          publisher,
        })),
      },
    };
    console.log(books);
    return responseData;
  } else {
    console.log("helo");
    let filteredBooks = books;

    if (name) {
      filteredBooks = filteredBooks?.filter((book) =>
        book.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    if (reading !== undefined) {
      filteredBooks = filteredBooks?.filter(
        (book) => book.reading === (reading == 1 ? true : false)
      );
    }

    if (finished !== undefined) {
      filteredBooks = filteredBooks?.filter(
        (book) => book.finished === (finished == 1 ? true : false)
      );
    }

    const response = h.response({
      status: "success",
      data: {
        books: filteredBooks.map(({ id, name, publisher }) => ({
          id,
          name,
          publisher,
        })),
      },
    });
    response.code(200);
    return response;
  }
};

const getBooksByIdHandler = async (req, h) => {
  const id = req.params.bookId;

  if (!id) {
    const response = h.response({
      status: "fail",
      message: "Buku tidak ditemukan",
    });
    response.code(404);
    return response;
  }

  const book = books.find((n) => n?.id === id);

  if (book) {
    const response = h.response({
      status: "success",
      data: {
        book,
      },
    });
    response.code(200);
    return response;
  } else {
    const response = h.response({
      status: "fail",
      message: "Buku tidak ditemukan",
    });
    response.code(404);
    return response;
  }
};

const updateBook = async (req, h) => {
  const id = req.params.bookId;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;

  if (!name) {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }

  // Mencari buku berdasarkan id
  const bookIndex = books.findIndex((book) => book.id === id);

  // Jika buku tidak ditemukan
  if (bookIndex === -1) {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Id tidak ditemukan",
    });
    response.code(404); // Mengubah kode status untuk 'Not Found'
    return response;
  }

  books[bookIndex] = {
    ...books[bookIndex],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    updatedAt: new Date().toISOString(),
  };

  const response = h.response({
    status: "success",
    message: "Buku berhasil diperbarui",
  });
  response.code(200); // Menggunakan kode status 200 untuk 'OK'
  return response;
};

const deleteBook = async (req, h) => {
  const id = req.params.bookId;

  // Mencari indeks buku berdasarkan id
  const bookIndex = books.findIndex((book) => book.id === id);

  // Jika buku tidak ditemukan
  if (bookIndex === -1) {
    const response = h.response({
      status: "fail",
      message: "Buku gagal dihapus. Id tidak ditemukan",
    });
    response.code(404); // Menggunakan kode status 404 untuk 'Not Found'
    return response;
  }

  // Menghapus buku dari daftar
  books.splice(bookIndex, 1);

  const response = h.response({
    status: "success",
    message: "Buku berhasil dihapus",
  });
  response.code(200); // Menggunakan kode status 200 untuk 'OK'
  return response;
};
const deleteBooks = async (req, h) => {
  // Menghapus semua nilai dari array books
  books.length = 0;

  const response = h.response({
    status: "success",
    message: "Berhasil menghapus semua buku",
  });
  response.code(200);
  return response;
};
module.exports = {
  postBooks,
  getBooks,
  getBooksByIdHandler,
  updateBook,
  deleteBook,
  deleteBooks,
};
