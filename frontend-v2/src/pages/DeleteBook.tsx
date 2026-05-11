import React, { useState } from "react";
import { BackButton, Spinner } from "../components";
import { useBooks } from "@/hooks/useBooks";
import { useNavigate, useParams } from "react-router-dom";
import { notifications } from "@mantine/notifications";

const DeleteBook: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { deleteBook } = useBooks();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const handleDeleteBook = () => {
    if (!id) {
      notifications.show({
        title: "Error",
        message: "Book ID not found",
        color: "red",
      });
      return;
    }

    setLoading(true);
    deleteBook.mutate(id, {
      onSuccess: () => {
        notifications.show({
          title: "Success",
          message: "Book deleted successfully",
          color: "green",
        });
        navigate("/");
      },
      onError: (error) => {
        notifications.show({
          title: "Error",
          message: "Failed to delete book",
          color: "red",
        });
        console.error(error);
        setLoading(false);
      },
    });
  };

  return (
    <div className="p-4 bg-slate-800 min-h-screen text-white">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading && <Spinner />}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-full lg:w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">Are you sure you want to delete this book?</h3>

        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={handleDeleteBook}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
