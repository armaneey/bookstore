import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { booksApi } from '@/api/api';
import { Book, BookCreateRequest, BookUpdateRequest } from '@/types/book';

export const useBooks = () => {
  const queryClient = useQueryClient();

  const getAllBooks = useQuery({
    queryKey: ['books'],
    queryFn: async (): Promise<Book[]> => {
      const response = await booksApi.getAll();
      return response.data.data;
    },
  });

  const getBookById = (id: string) => {
    return useQuery({
      queryKey: ['book', id],
      queryFn: async (): Promise<Book> => {
        const response = await booksApi.getById(id);
        return response.data;
      },
      enabled: !!id,
    });
  };

  const createBook = useMutation({
    mutationFn: (bookData: BookCreateRequest) => booksApi.create(bookData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
  });

  const updateBook = useMutation({
    mutationFn: ({ id, data }: { id: string; data: BookUpdateRequest }) => 
      booksApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
  });

  const deleteBook = useMutation({
    mutationFn: (id: string) => booksApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
  });

  const searchBooks = (query: string) => {
    return useQuery({
      queryKey: ['books', 'search', query],
      queryFn: async (): Promise<Book[]> => {
        const response = await booksApi.search(query);
        return response.data.data;
      },
      enabled: !!query,
    });
  };

  return {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
    searchBooks,
  };
};
