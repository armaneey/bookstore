const home = () => '/';
const createBooks = () => '/books/create';
const detailsBooks = (id: string | number = ":id") => `/books/details/${id}`;
const books = (id: string | number = ":id") => `/books/${id}`;
const editBook = (id: string | number = ":id") => `/books/edit/${id}`;
const deletesBooks = (id: string | number = ":id") => `/books/delete/${id}`;
const searchBooks = () => '/books/search';

export const routes = {
  home,
  createBooks,
  detailsBooks,
  books,
  editBook,
  deletesBooks,
  searchBooks,
};