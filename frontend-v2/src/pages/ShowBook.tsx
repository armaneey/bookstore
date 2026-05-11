import React from "react";
import { useParams } from "react-router-dom";
import { Spinner, BackButton } from "../components";
import moment from "moment";
import { useBooks } from "@/hooks/useBooks";

const ShowBook: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getBookById } = useBooks();
  const { data: book, isLoading, error } = getBookById(id || "");

  if (isLoading) return <Spinner />;
  if (error || !book) return <div>Error loading book</div>;

  return (
    <div className="p-4 bg-slate-800 text-white min-h-screen">
      <BackButton />
      <h1 className="text-3xl my-4">Book Details</h1>

      <div className="flex items-center justify-center">
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4 gap-6">
          <div>
            <span className="text-xl mr-4 text-gray-500">Id</span>
            <span>{book._id}</span>
          </div>
          <div>
            <span className="text-xl mr-4 text-gray-500">Title</span>
            <span>{book.title}</span>
          </div>
          <div>
            <span className="text-xl mr-4 text-gray-500">Author</span>
            <span>{book.author}</span>
          </div>
          <div>
            <span className="text-xl mr-4 text-gray-500">Publish Year</span>
            <span>{book.publishYear}</span>
          </div>
          {book.createdAt && (
            <div>
              <span className="text-xl mr-4 text-gray-500">Create Time</span>
              <span>{moment(book.createdAt).format("Do MMM YYYY, h:mm a")}</span>
            </div>
          )}
          {book.updatedAt && (
            <div>
              <span className="text-xl mr-4 text-gray-500">Last Update Time</span>
              <span>{moment(book.updatedAt).format("Do MMM YYYY, h:mm a")}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowBook;
