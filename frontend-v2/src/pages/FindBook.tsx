import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
    setSearchQuery(query);
  };

  const handleClear = () => {
    setQuery("");
    setSearchQuery("");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100/80 p-4 mb-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate("/")}
                className="group px-4 py-2.5 text-slate-700 hover:bg-slate-50 rounded-xl transition-all duration-300 flex items-center gap-2 font-medium"
              >
                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                Back to Library
              </button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-900 to-slate-800 bg-clip-text text-transparent">Search Books</h1>
            </div>
          </div>
          <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-slate-100/80 shadow-xl p-12">
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-4"></div>
              <p className="text-slate-600 font-medium">Searching your library...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 py-8 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100/80 p-6 mb-6 animate-fade-in-up backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/30 animate-float">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-900 via-blue-800 to-slate-800 bg-clip-text text-transparent">Search Books</h1>
                <p className="text-sm text-slate-500 mt-1 font-medium">Find books by title or author</p>
              </div>
            </div>
            <button
              onClick={() => navigate("/")}
              className="group px-4 py-2.5 bg-white border border-blue-200 rounded-xl text-blue-900 hover:bg-blue-50 hover:border-blue-400 hover:shadow-md transition-all duration-300 flex items-center gap-2 font-medium"
            >
              <svg className="w-4 h-4 text-blue-600 group-hover:text-blue-700 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              Back to Library
            </button>
          </div>
        </div>

        {/* Search Form */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-slate-100/80 p-8 mb-6 animate-fade-in-up stagger-2">
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSearch} className="flex flex-col gap-4">
              <label className="block text-sm font-semibold text-blue-900 mb-2">Search for Books</label>
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={query}
                    placeholder="Search by title or author..."
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full px-6 py-4 bg-blue-50/80 border border-blue-200 rounded-2xl text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-600 focus:bg-white transition-all duration-300 text-lg font-medium pr-12"
                    autoFocus
                  />
                  <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
                <button
                  type="submit"
                  className="px-6 py-4 bg-gradient-to-r from-blue-900 via-blue-800 to-slate-800 text-white rounded-2xl hover:from-blue-800 hover:via-blue-700 hover:to-slate-700 transition-all duration-300 font-medium shadow-lg shadow-blue-900/30 hover:shadow-xl border border-yellow-500/40 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  Search
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-6 py-4 bg-slate-100 text-slate-700 rounded-2xl hover:bg-slate-200 transition-all duration-300 font-medium border border-slate-200 hover:border-slate-300"
                >
                  Clear
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Results */}
        <div className="animate-fade-in-up stagger-3">
          {books.length > 0 ? (
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-slate-100/80 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-blue-900 flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                  </span>
                  Search Results
                </h2>
                <span className="text-sm text-slate-500 bg-blue-50 px-3 py-1 rounded-full font-medium">{books.length} books found</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {books.map((book, index) => (
                  <Card book={book} index={index} key={book._id} />
                ))}
              </div>
            </div>
          ) : query ? (
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-slate-100/80 p-12 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-blue-100">
                <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">No books found</h3>
              <p className="text-slate-600 mb-6">No books match "{query}". Try searching with different keywords.</p>
              <button
                onClick={handleClear}
                className="px-6 py-3 bg-gradient-to-r from-blue-900 via-blue-800 to-slate-800 text-white rounded-xl hover:from-blue-800 hover:via-blue-700 hover:to-slate-700 transition-all duration-300 font-medium shadow-lg shadow-blue-900/30 hover:shadow-xl border border-yellow-500/40"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-slate-100/80 p-12 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-blue-100">
                <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">Search Your Library</h3>
              <p className="text-slate-600 mb-6">Enter a book title or author name to search through your collection.</p>
              <div className="flex justify-center gap-4">
                <a
                  href="/books/create"
                  className="px-6 py-3 bg-gradient-to-r from-blue-900 via-blue-800 to-slate-800 text-white rounded-xl hover:from-blue-800 hover:via-blue-700 hover:to-slate-700 transition-all duration-300 font-medium shadow-lg shadow-blue-900/30 hover:shadow-xl border border-yellow-500/40"
                >
                  Add New Book
                </a>
                <button
                  onClick={() => navigate("/")}
                  className="px-6 py-3 bg-white border border-blue-200 text-blue-900 rounded-xl hover:bg-blue-50 hover:border-blue-400 hover:shadow-md transition-all duration-300 font-medium"
                >
                  View All Books
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindBook;

