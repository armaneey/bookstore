import React from "react";
import Card from "../Card";
import { Book } from "@/types/book";

interface BooksCardProps {
  books: Book[];
}

const BooksCard: React.FC<BooksCardProps> = ({ books }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {books.map((book, index) => (
        <Card book={book} index={index} key={book._id} />
      ))}
    </div>
  );
};

export default BooksCard;
