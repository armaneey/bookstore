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
      <Route path="/books/create" element={<CreateBooks />} />
      <Route path="/books/details/:id" element={<ShowBook />} />
      <Route path="/books/:id" element={<BookDetail />} />
      <Route path="/books/edit/:id" element={<EditBook />} />
      <Route path="/books/delete/:id" element={<DeleteBook />} />
      <Route path="/books/search" element={<FindBook />} />
    </Routes>
  );
};

export default App;
