import React from "react";
import { useBooks } from "@/hooks/useBooks";
import { useNavigate, useParams } from "react-router-dom";

const BookDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { getBookById } = useBooks();
  const { data: book, isLoading, error } = getBookById(id || "");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 mb-6">
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              Back
            </button>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <div className="flex flex-col items-center py-12">
              <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600">Loading book...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 mb-6">
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              Back
            </button>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{error?.message || "Book not found"}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 py-8 animate-fade-in">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-slate-100/80 p-4 mb-6 animate-fade-in-up">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/")}
              className="group px-4 py-2.5 text-slate-600 hover:bg-slate-50 rounded-xl transition-all duration-300 flex items-center gap-2 font-medium hover:shadow-md active:scale-95"
            >
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              Back to Library
            </button>
            <div className="flex gap-3">
              <a
                href={`/books/edit/${book._id}`}
                className="group px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-all duration-300 flex items-center gap-2 font-medium hover:shadow-md active:scale-95"
              >
                <svg className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                Edit
              </a>
              <button
                onClick={() => {
                  if (window.confirm(`Delete "${book.title}"?`)) {
                    navigate("/");
                  }
                }}
                className="group px-4 py-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all duration-300 flex items-center gap-2 font-medium hover:shadow-md active:scale-95"
              >
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* Book Info Card */}
        <div className="bg-white rounded-2xl border border-slate-100/80 shadow-2xl overflow-hidden animate-scale-in stagger-2">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-slate-800 p-8 text-white relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-500/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="flex items-start gap-6 relative z-10">
              <div className="w-28 h-36 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center flex-shrink-0 border border-yellow-400/30 shadow-2xl animate-float">
                <svg className="w-14 h-14 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              </div>
              <div className="flex-1">
                <span className="inline-block px-4 py-1.5 bg-yellow-500/20 backdrop-blur-sm text-yellow-100 text-xs font-bold rounded-full mb-4 border border-yellow-400/30 uppercase tracking-wider">Book</span>
                <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">{book.title}</h1>
                <p className="text-xl text-blue-100 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  {book.author}
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 animate-fade-in-up stagger-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Main Info */}
              <div className="md:col-span-2 space-y-6">
                {/* Details */}
                <div className="bg-gradient-to-br from-blue-50 to-slate-50/30 rounded-2xl border border-blue-100/80 p-6 space-y-4 shadow-sm">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2 text-lg">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    </div>
                    Book Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="group bg-white rounded-xl p-4 border border-blue-100 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-300">
                      <span className="text-xs text-blue-500/70 uppercase tracking-wider font-semibold">Published</span>
                      <p className="text-2xl font-bold text-blue-900 mt-1 group-hover:text-blue-700 transition-colors">{book.publishYear}</p>
                    </div>
                    <div className="group bg-white rounded-xl p-4 border border-blue-100 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-300">
                      <span className="text-xs text-blue-500/70 uppercase tracking-wider font-semibold">Book ID</span>
                      <p className="text-sm font-mono text-slate-500 mt-2 truncate">{book._id}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
                  <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-lg">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    About this Book
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    "{book.title}" by {book.author} is a significant work published in {book.publishYear}. 
                    This book represents an important contribution to literature and has captivated readers 
                    with its unique perspective and compelling narrative.
                  </p>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-4">
                <div className="group bg-gradient-to-br from-blue-800 via-blue-700 to-slate-800 rounded-2xl border border-yellow-500/30 p-6 text-center shadow-lg shadow-blue-900/20 hover:shadow-xl hover:shadow-blue-900/30 transition-all duration-500 hover:-translate-y-1">
                  <div className="w-14 h-14 bg-yellow-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 border border-yellow-400/30 shadow-inner">
                    <svg className="w-7 h-7 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                  <p className="text-4xl font-bold text-white">{book.publishYear}</p>
                  <p className="text-blue-200 mt-2 font-medium">Year Published</p>
                </div>

                <div className="group bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl border border-emerald-400/30 p-6 text-center shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-500 hover:-translate-y-1">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/30 shadow-inner">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <p className="text-2xl font-bold text-white">Available</p>
                  <p className="text-emerald-100 mt-2 font-medium">In Library</p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
                  <h4 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                    Quick Stats
                  </h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-xl">
                      <span className="text-sm text-slate-500">Title Length</span>
                      <span className="text-sm font-bold text-slate-700 bg-white px-3 py-1 rounded-full border border-slate-100">{book.title.length} chars</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-xl">
                      <span className="text-sm text-slate-500">Author</span>
                      <span className="text-sm font-bold text-slate-700 bg-white px-3 py-1 rounded-full border border-slate-100">{book.author}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
