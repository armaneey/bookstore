import React from "react";
import { useBooks } from "@/hooks/useBooks";
import { Book } from "@/types/book";
import Loader from "@/components/Loader";

const Home: React.FC = () => {
  const { getAllBooks, deleteBook } = useBooks();
  const { data: books = [], isLoading, error } = getAllBooks;
  const [sortBy, setSortBy] = React.useState<'title' | 'author' | 'year'>('title');
  const [layout, setLayout] = React.useState<'grid' | 'list' | 'compact'>('grid');
  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('asc');

  const handleDeleteBook = (book: Book) => {
    if (window.confirm(`Are you sure you want to delete "${book.title}"?`)) {
      deleteBook.mutate(book._id!, {
        onSuccess: () => {
          alert("Book deleted successfully");
        },
        onError: () => {
          alert("Failed to delete book");
        },
      });
    }
  };

  // Sorting logic
  const sortedBooks = React.useMemo(() => {
    const sorted = [...books];
    sorted.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'author':
          comparison = a.author.localeCompare(b.author);
          break;
        case 'year':
          comparison = parseInt(a.publishYear) - parseInt(b.publishYear);
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });
    
    return sorted;
  }, [books, sortBy, sortOrder]);

  if (isLoading) {
    return (
      <Loader/>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">Bookstore</h1>
            </div>
          </div>
          <div className="bg-red-50/80 backdrop-blur-sm border border-red-100 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <p className="text-red-700 font-medium">Error loading books: {error.message}</p>
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
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-900 via-blue-800 to-slate-800 bg-clip-text text-transparent">Bookstore</h1>
                <p className="text-sm text-slate-500 mt-1 font-medium">{books.length} books in your library</p>
              </div>
            </div>
            <div className="flex gap-3">
              <a href="/books/search" className="group px-4 py-2.5 bg-white border border-blue-200 rounded-xl text-blue-900 hover:bg-blue-50 hover:border-blue-400 hover:shadow-md transition-all duration-300 flex items-center gap-2 font-medium">
                <svg className="w-4 h-4 text-blue-600 group-hover:text-blue-700 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                Search
              </a>
              <a href="/books/create" className="group px-4 py-2.5 bg-gradient-to-r from-blue-900 via-blue-800 to-slate-800 text-white rounded-xl hover:from-blue-800 hover:via-blue-700 hover:to-slate-700 transition-all duration-300 shadow-lg shadow-blue-900/30 hover:shadow-xl hover:shadow-blue-900/40 hover:-translate-y-0.5 flex items-center gap-2 font-medium border border-yellow-500/50">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                Add Book
              </a>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-slate-100/80 p-4 mb-6 animate-fade-in-up stagger-1">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div>
                <label className="block text-xs font-semibold text-blue-900 mb-1.5 uppercase tracking-wider">Sort by</label>
                <div className="relative group">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'title' | 'author' | 'year')}
                    className="block w-36 px-4 py-2.5 bg-blue-50/80 border border-blue-200 rounded-xl text-sm font-medium text-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-600 transition-all duration-300 cursor-pointer hover:bg-white hover:shadow-md"
                  >
                    <option value="title">Title</option>
                    <option value="author">Author</option>
                    <option value="year">Year</option>
                  </select>
                </div>
              </div>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="mt-6 p-2.5 bg-blue-50 text-blue-700 hover:text-blue-800 hover:bg-blue-100 rounded-xl transition-all duration-300 border border-blue-200 hover:border-blue-400 hover:shadow-md active:scale-95"
                title={`Sort ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
              >
                {sortOrder === 'asc' ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                )}
              </button>
            </div>

            <div className="flex items-center gap-2 bg-blue-100/80 p-1.5 rounded-xl border border-blue-200">
              <span className="text-sm font-semibold text-blue-800 px-2">View:</span>
              <button
                onClick={() => setLayout('list')}
                className={`p-2 rounded-lg transition-all duration-300 ${layout === 'list' ? 'bg-white text-blue-700 shadow-md border border-blue-200' : 'text-blue-500 hover:text-blue-800 hover:bg-white/50'}`}
                title="List view"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              </button>
              <button
                onClick={() => setLayout('compact')}
                className={`p-2 rounded-lg transition-all duration-300 ${layout === 'compact' ? 'bg-white text-blue-700 shadow-md border border-blue-200' : 'text-blue-500 hover:text-blue-800 hover:bg-white/50'}`}
                title="Compact view"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Grid Layout */}
        {layout === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {sortedBooks.map((book, index) => (
              <div 
                key={book._id} 
                className="group bg-white rounded-2xl border border-slate-200/80 p-5 hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 via-blue-50 to-slate-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:from-blue-200 group-hover:via-blue-100 group-hover:to-slate-200 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm group-hover:shadow-md">
                    <svg className="w-6 h-6 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                  </div>
                  <span className="text-xs font-bold bg-gradient-to-r from-blue-100 to-slate-50 text-blue-800 px-3 py-1.5 rounded-full border border-blue-200">#{index + 1}</span>
                </div>
                <h3 className="font-bold text-slate-800 text-lg mb-3 line-clamp-2 group-hover:text-blue-800 transition-colors duration-300">{book.title}</h3>
                <div className="text-sm text-slate-600 mb-5 space-y-2">
                  <p className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    <span className="truncate">{book.author}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    <span>{book.publishYear}</span>
                  </p>
                </div>
                <div className="space-y-2.5">
                  <a
                    href={`/books/${book._id}`}
                    className="group/btn block w-full text-center px-4 py-2.5 bg-gradient-to-r from-blue-900 via-blue-800 to-slate-800 text-white text-sm font-semibold rounded-xl hover:from-blue-800 hover:via-blue-700 hover:to-slate-700 transition-all duration-300 shadow-lg shadow-blue-900/25 hover:shadow-xl hover:shadow-blue-900/40 hover:-translate-y-0.5 border border-yellow-500/30"
                  >
                    <span className="flex items-center justify-center gap-2">
                      View Details
                      <svg className="w-4 h-4 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </span>
                  </a>
                  <div className="flex gap-2">
                    <a
                      href={`/books/edit/${book._id}`}
                      className="flex-1 text-center px-3 py-2 bg-blue-50 text-blue-800 text-sm font-medium rounded-lg hover:bg-blue-100 hover:shadow-sm transition-all duration-300"
                    >
                      Edit
                    </a>
                    <button
                      onClick={() => handleDeleteBook(book)}
                      disabled={deleteBook.isPending}
                      className="flex-1 px-3 py-2 bg-red-50 text-red-600 text-sm font-medium rounded-lg hover:bg-red-100 hover:shadow-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {deleteBook.isPending ? (
                        <svg className="animate-spin h-4 w-4 mx-auto" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                      ) : 'Delete'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* List Layout */}
        {layout === 'list' && (
          <div className="space-y-3">
            {sortedBooks.map((book, index) => (
              <div 
                key={book._id} 
                className="group bg-white rounded-xl border border-slate-200/80 p-4 hover:border-blue-400/50 hover:shadow-xl hover:shadow-blue-900/10 transition-all duration-500 animate-slide-in-right"
                style={{ animationDelay: `${index * 0.03}s` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:from-blue-100 group-hover:via-slate-100 group-hover:to-blue-200 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm">
                      <svg className="w-7 h-7 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 text-lg group-hover:text-blue-800 transition-colors duration-300">{book.title}</h3>
                      <p className="text-sm text-slate-600 flex items-center gap-2">
                        <span className="flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                          {book.author}
                        </span>
                        <span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
                        <span className="flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          {book.publishYear}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={`/books/${book._id}`}
                      className="group/btn px-4 py-2 bg-gradient-to-r from-blue-900 via-blue-800 to-slate-800 text-white text-sm font-medium rounded-lg hover:from-blue-800 hover:via-blue-700 hover:to-slate-700 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-1 border border-yellow-500/30"
                    >
                      View
                      <svg className="w-3.5 h-3.5 opacity-0 group-hover/btn:opacity-100 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </a>
                    <a
                      href={`/books/edit/${book._id}`}
                      className="px-4 py-2 bg-blue-50 text-blue-800 text-sm font-medium rounded-lg hover:bg-blue-100 hover:shadow-sm transition-all duration-300"
                    >
                      Edit
                    </a>
                    <button
                      onClick={() => handleDeleteBook(book)}
                      disabled={deleteBook.isPending}
                      className="px-4 py-2 bg-red-50 text-red-600 text-sm font-medium rounded-lg hover:bg-red-100 hover:shadow-sm transition-all duration-300 disabled:opacity-50"
                    >
                      {deleteBook.isPending ? (
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                      ) : 'Delete'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Compact Layout */}
        {layout === 'compact' && (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-lg overflow-hidden">
            {sortedBooks.map((book, index) => (
              <div
                key={book._id}
                className="group flex items-center justify-between px-5 py-4 border-b border-slate-50 last:border-0 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-slate-50/30 transition-all duration-500 animate-fade-in"
                style={{ animationDelay: `${index * 0.02}s` }}
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-blue-600 w-8">#{index + 1}</span>
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100 rounded-xl flex items-center justify-center group-hover:from-blue-100 group-hover:via-slate-100 group-hover:to-blue-200 transition-all duration-500 group-hover:scale-110 shadow-sm">
                    <svg className="w-5 h-5 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800 group-hover:text-blue-800 transition-colors duration-300 truncate max-w-[300px]">{book.title}</p>
                    <p className="text-xs text-slate-500 flex items-center gap-1.5">
                      <span>{book.author}</span>
                      <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                      <span>{book.publishYear}</span>
                    </p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <a
                    href={`/books/${book._id}`}
                    className="p-2 text-blue-400 hover:text-blue-800 hover:bg-blue-100 rounded-xl transition-all duration-300 hover:scale-110"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  </a>
                  <a
                    href={`/books/edit/${book._id}`}
                    className="p-2 text-blue-400 hover:text-blue-800 hover:bg-blue-100 rounded-xl transition-all duration-300 hover:scale-110"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                  </a>
                  <button
                    onClick={() => handleDeleteBook(book)}
                    disabled={deleteBook.isPending}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-100 rounded-xl transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:hover:scale-100"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {books.length === 0 && (
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-slate-200/80 shadow-2xl text-center py-24 animate-scale-in">
            <div className="flex flex-col items-center gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 via-slate-100 to-blue-200 rounded-3xl flex items-center justify-center shadow-lg animate-float">
                <svg className="w-12 h-12 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              </div>
              <div className="animate-fade-in-up stagger-2">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-900 to-slate-800 bg-clip-text text-transparent mb-3">Your Library is Empty</h3>
                <p className="text-slate-600 max-w-md mx-auto text-lg">Start building your collection by adding your first book today!</p>
              </div>
              <a
                href="/books/create"
                className="group px-8 py-4 bg-gradient-to-r from-blue-900 via-blue-800 to-slate-800 text-white rounded-2xl hover:from-blue-800 hover:via-blue-700 hover:to-slate-700 transition-all duration-300 shadow-xl shadow-blue-900/30 hover:shadow-2xl hover:shadow-blue-900/40 hover:-translate-y-1 flex items-center gap-3 font-semibold text-lg animate-fade-in-up stagger-3 border border-yellow-500/40"
              >
                <svg className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                Add Your First Book
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
