import React, { useState } from "react";
import { Spinner, BackButton, Card } from "../components";
import { useBooks } from "@/hooks/useBooks";
import { Card } from "../components";

const FindBook: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { searchBooks } = useBooks();
  const { data: books = [], isLoading } = searchBooks(searchQuery);

  // Debounce search to prevent too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // The searchBooks hook will automatically trigger when query changes
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="bg-slate-800 min-h-screen text-white p-6">
      <BackButton />
      <h1 className="text-3xl my-4">Find Book</h1>
      <div className="flex flex-col gap-10">
        <form
          onSubmit={handleSearch}
          className="flex items-center justify-center w-full h-full"
        >
          <input
            type="text"
            value={query}
            placeholder="Search with book Title or Author"
            onChange={(e) => setQuery(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-72 rounded-md bg-slate-500 focus:outline-none"
          />

          <button
            className="p-2 bg-sky-300 font-bold rounded-r-xl h-full"
            type="submit"
          >
            Search
          </button>
        </form>
        {books.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {books.map((book, index) => (
              <Card book={book} index={index} key={book._id} />
            ))}
          </div>
        ) : (
          <div className="mt-24 flex flex-col items-center justify-center text-center">
            Oops!, No such books in database, Try again?
          </div>
        )}
      </div>
    </div>
  );
};

export default FindBook;

