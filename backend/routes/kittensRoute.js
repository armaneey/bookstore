// Below are the routes used for kittens
import express from "express";
import { Kitten } from "../models/kittyModel.js";

const router = express.Router();

// used to put or create a kitten resource
// router.post("/", async (request, response) => {
//   try {
//     if (!request.body.name) {
//       console.log("Send the required name");
//       return response.status(400).send({
//         message: "Send the required name",
//       });
//     }

//     const newKitten = {
//       name: request.body.name,
//     };

//     console.log(newKitten);

//     const kitten = await Kitten.create(newKitten);

//     return response.status(201).send(kitten);
//   } catch (error) {
//     console.log(error.message);
//     console.log(request.body);
//     response.status(500).send({ message: error.message });
//   }
// });

// used to get all the kittens from database
router.get("/", async (request, response) => {
  try {
    // request made to get all books
    const kittens = await Kitten.find({});

    // response returned from request
    return response.status(200).json({
      count: kittens.length,
      data: kittens,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// getting a book by name
router.get("/:name", async (request, response) => {
  try {
    // request made to get a kitten by name

    const { name } = request.params;

    const kitten = await Kitten.find({ name: name });

    // response returned from request
    return response.status(200).json({
      count: kitten.length,
      data: kitten,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// used for a function, post a kitten and then in return get a cool response from console
router.post("/", async (request, response) => {
  try {
    if (!request.body.name) {
      console.log("Send the required name");
      return response.status(400).send({
        message: "Send the required name",
      });
    }

    const newKitten = {
      name: request.body.name,
    };

    // logs the object
    console.log(newKitten);

    const kitten = await Kitten.create(newKitten);
    console.log(kitten.speak());

    // sends the created kitten object back as a response
    return response.status(201).send(kitten);
  } catch (error) {
    console.log(error.message);
    console.log(request.body);
    response.status(500).send({ message: error.message });
  }
});

export default router;
