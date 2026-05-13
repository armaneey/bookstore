import React from "react";
import { useBooks } from "@/hooks/useBooks";
import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { z } from "zod";
import { 
  Button, 
  TextInput, 
  Box, 
  Stack, 
  Title, 
  Paper, 
  Text, 
  Group 
} from "@mantine/core";
import { zodResolver } from 'mantine-form-zod-resolver';
import { notifications } from "@mantine/notifications";
import { routes } from "@/lib/routes";
import { FaPlus } from "react-icons/fa";

// Form validation schema
const bookSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  author: z
    .string()
    .min(1, "Author is required")
    .max(100, "Author must be less than 100 characters"),
  publishYear: z
    .string()
    .min(4, "Year must be at least 4 digits")
    .max(4, "Year must be exactly 4 digits")
    .regex(/^\d{4}$/, "Year must be a valid 4-digit year"),
});

type BookFormData = z.infer<typeof bookSchema>;

const CreateBooks: React.FC = () => {
  const navigate = useNavigate();
  const { createBook } = useBooks();

  // Form setup with validation
  const form = useForm<BookFormData>({
    validate: zodResolver(bookSchema),
    initialValues: {
      title: "",
      author: "",
      publishYear: new Date().getFullYear().toString(),
    },
  });

  // Handle form submission
  const handleSubmit = (values: BookFormData) => {
    createBook.mutate(values, {
      onSuccess: () => {
        notifications.show({
          title: "Success",
          message: "Book created successfully",
          color: "green",
        });
        navigate("/");
      },
      onError: (error) => {
        notifications.show({
          title: "Error",
          message: "Failed to create book",
          color: "red",
        });
        console.error(error);
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-4 mb-6">
          <div className="flex items-center justify-between">
            <Button
              variant="subtle"
              onClick={() => navigate(routes.home())}
              leftSection={
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              }
            >
              Back to Library
            </Button>
            <Title order={1}>Create New Book</Title>
          </div>
        </div>

        <Paper shadow="xl" withBorder p={0}>
          <Box p={24}>
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Stack gap="lg">
                <Title order={2} mb="md">Add a New Book</Title>
                <Text c="dimmed" size="sm" mb="lg">
                  Fill in the details below to add a new book to your collection
                </Text>
                
                <TextInput
                  withAsterisk
                  label="Book Title"
                  placeholder="Enter the book title"
                  key={form.key('title')}
                  {...form.getInputProps('title')}
                />
                
                <TextInput
                  withAsterisk
                  label="Author"
                  placeholder="Enter the author's name"
                  key={form.key('author')}
                  {...form.getInputProps('author')}
                />

                <TextInput
                  withAsterisk
                  label="Publish Year"
                  placeholder="Enter the publish year e.g 2022"
                  key={form.key('publishYear')}
                  {...form.getInputProps('publishYear')}
                />
                
                <Group justify="flex-end" mt="xl">
                  <Button
                    variant="subtle"
                    onClick={() => navigate(routes.home())}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    loading={createBook.isPending}
                    leftSection={<FaPlus />}
                  >
                    Create Book
                  </Button>
                </Group>
              </Stack>
            </form>
          </Box>
        </Paper>
      </div>
    </div>
  );
};

export default CreateBooks;

