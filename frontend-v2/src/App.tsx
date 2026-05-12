import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  CreateBooks,
  DeleteBook,
  EditBook,
  Home,
  ShowBook,
  FindBook,
  BookDetail,
} from "./pages";

import {routes } from "./lib/routes";
const App: React.FC = () => {
  return (
    <Routes>
      <Route path= {routes.home()} element={<Home />} />
      <Route path= {routes.createBooks()} element={<CreateBooks />} />
      <Route path= {routes.detailsBooks()}element={<ShowBook />} />
      <Route path= {routes.books()}element={<BookDetail />} />
      <Route path= {routes.editBook()} element={<EditBook />} />
      <Route path= {routes.deletesBooks()}element={<DeleteBook />} />
      <Route path= {routes.searchBooks()} element={<FindBook />} />
    </Routes>
  );
};

export default App;
