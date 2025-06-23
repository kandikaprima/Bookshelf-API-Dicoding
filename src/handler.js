const { nanoid } = require('nanoid');const books = require('./books');

const addBookHandler = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;
  const isFinished = (pageCount == readPage) ? true : false;

  const newBook = {
   id, name, year, author, summary, publisher, pageCount, readPage, isFinished, reading, createdAt, updatedAt,
  };
 
  books.push(newBook);
 
  const isSuccess = books.filter((book) => book.id === id).length > 0;
 
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }
 
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllBooksHandler = () => ({
  status: 'success',
  data: {
    books,
  },
});

const getBookByIdHandler = (request, h) => {
  const { id } = request.params;
 
  const book = books.filter((b) => b.id === id)[0];
 
  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }
 
  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
  response.code(404);
  return response;
}; 

module.exports = { addBookHandler, getAllBooksHandler, getBookByIdHandler };