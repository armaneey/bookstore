import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import tanksRoute from "./routes/tanksRoute.js";
import kittensRoute from "./routes/kittensRoute.js";

// app expressing itself
const app = express();

// Middleware for parsing request body
app.use(express.json());

// For importing env details
dotenv.config();

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with default of cors(*)
app.use(cors());
// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

// // use to make all the book routes active
app.use("/books", booksRoute);

// use to make all the tank routes active
app.use("/tanks", tanksRoute);

// use to make all the kitten routes active
app.use("/kittens", kittensRoute);

// used to connect to database
async function connectToDatabase() {
  try {
    await mongoose.connect(`${process.env.MONGODBURL}`);
    app.listen(`${process.env.PORT}` || 5000, () => {
      console.log(`App is listening to port: ${process.env.PORT}`);
    });

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectToDatabase();

// used to get a resource from our running {PORT} server
app.get("/", (request, response) => {
  console.log(request);
  return response
    .status(234)
    .send(
      "Welcome to understanding backend operations, The Objective here is to learn crud as fast possible, facing and conquering each obstacle and tackling with the same effect, Learn kittens and books from mongodb documentation"
    );
});

// used to get a resource from our running {PORT} server
app.get("/books", (request, response) => {
  console.log(books);
  return response.status(234).send("books");
});

// used to get a resource from our running {PORT} server
app.get("/tanks", (request, response) => {
  console.log(tanks);
  return response.status(234).send("tanks");
});

// used to get a resource from our running {PORT} server
app.get("/kittens", (request, response) => {
  console.log(kittens);
  return response.status(234).send("kittens");
});

// // Useful Code

// // For retrying database connection

// Useless code
// this connects the app to the database
// mongoose
//   .connect(mongoDBURL)
//   .then(DatabasePORT, (e) => {
//     console.log(e);
//     console.log("App connected to database");
//     //  indicates that the port is alive thanks to our framework express
//     app.listen(PORT, () => {
//       console.log(`App is listening to port: ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });
// // import retry from "retry";

// // const operation = retry.operation();

// // operation.attempt(async () => {
// //   try {
// //     await mongoose.connect(mongoDBURL);
// //     console.log("App connected to the database");
// //   } catch (error) {
// //     console.error(`Failed to connect to MongoDB. Retrying...`);
// //     if (operation.retry(error)) {
// //       return;
// //     }
// //   }
// // });
