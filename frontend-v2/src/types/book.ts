import { z } from 'zod';

export const BookSchema = z.object({
  _id: z.string().optional(),
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  publishYear: z.string().min(1, 'Publish year is required'),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type Book = z.infer<typeof BookSchema>;

export interface BookResponse {
  data: Book[];
  success: boolean;
  message?: string;
}

export interface BookCreateRequest {
  title: string;
  author: string;
  publishYear: string;
}

export interface BookUpdateRequest extends Partial<BookCreateRequest> {
  _id?: string;
}
