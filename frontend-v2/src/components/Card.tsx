import React from "react";
import { Link } from "react-router-dom";
import { Book } from "@/types/book";
// icons
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";

interface CardProps {
  book: Book;
  index: number;
}

const Card: React.FC<CardProps> = ({ book, index }) => {
  return (
    <div
      className="flex flex-col h-full w-full justify-between border rounded-2xl p-6 gap-6"
      key={book._id}
    >
      <div className=" w-full flex flex-col gap-6 capitalize">
        <div className="flex justify-between border-b-[1px] border-white">
          <p>No</p>
          <p>{index + 1}</p>
        </div>
        <p>
          Title:
          <span className="ml-2">{book.title}</span>
        </p>
        <div className="flex gap-2 items-center">
          <RxAvatar className="text-2xl" />
          <p>{book.author}</p>
        </div>
        <p>PublishYear: {book.publishYear}</p>
      </div>
      <div className="flex justify-between border-t-[1px] border-white pt-2">
        <Link to={`/books/details/${book._id}`}>
          <BsInfoCircle
            className="text-2xl text-green-800 transition duration-1000 
                                        hover:scale-125"
          />
        </Link>
        <Link to={`/books/edit/${book._id}`}>
          <AiOutlineEdit
            className="text-2xl text-yellow-600 transition duration-1000 
                                        hover:scale-125"
          />
        </Link>
        <Link to={`/books/delete/${book._id}`}>
          <MdOutlineDelete
            className="text-2xl text-red-600 transition duration-1000 
                                        hover:scale-125"
          />
        </Link>
      </div>
    </div>
  );
};

export default Card;
