import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Book API endpoints
export const booksApi = {
  getAll: () => api.get('/books'),
  getById: (id: string) => api.get(`/books/${id}`),
  create: (data: { title: string; author: string; publishYear: string }) => 
    api.post('/books', data),
  update: (id: string, data: { title?: string; author?: string; publishYear?: string }) => 
    api.put(`/books/${id}`, data),
  delete: (id: string) => api.delete(`/books/${id}`),
  search: (query: string) => api.get(`/books/search/${query}`),
};
