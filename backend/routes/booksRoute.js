// Below are the routes used for books
import express, { response } from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// used to put or create a book resource
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      console.log("Send all required fields: title, author, publishYear");
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    console.log(newBook);

    const book = await Book.create(newBook);

    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// used to get all the books from database
router.get("/", async (request, response) => {
  try {
    // request made to get all books
    const books = await Book.find({});

    // response returned from request
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// used to get a single book from the database by id
router.get("/:id", async (request, response) => {
  try {
    // request made to get all books

    const { id } = request.params;

    const book = await Book.findById(id);

    // response returned from request
    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// used to update a book by id
router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      console.log("Send all required fields: title, author, publishYear");
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    const { id } = request.params;

    const result = await Book.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }

    return response.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// used to delete a book by id
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }

    return response.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// used to finding books by title & author
router.get("/search/:query", async (request, response) => {
  try {
    const { query } = request.params;

    const book = await Book.find({});

    const searchQuery = book
      .filter(
        (item) =>
          item?.title?.toLowerCase().includes(query) ||
          item?.author?.toLowerCase().includes(query)
      )
      .sort((a, b) =>
        a.title.localeCompare(b.title, "en", { sensitivity: "base" })
      );

    // response returned from request
    return response.status(200).json({
      count: searchQuery.length,
      data: searchQuery,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
