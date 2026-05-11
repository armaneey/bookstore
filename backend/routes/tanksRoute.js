// Below are the routes used for tanks
import express, { request } from "express";
import { Tank } from "../models/tankModel.js";

const router = express.Router();

// used to put or create a tank resource
router.post("/", async (request, response) => {
  try {
    if (!request.body.name || !request.body.size) {
      console.log("Send all required fields: name, size");
      return response.status(400).send({
        message: "Send all required fields: name, size",
      });
    }

    const newTank = {
      name: request.body.name,
      size: request.body.size,
    };

    console.log(newTank);

    const tank = await Tank.create(newTank);

    return response.status(201).send(tank);
  } catch (error) {
    console.log(error.message);
    console.log(request.body);
    response.status(500).send({ message: error.message });
  }
});

// used to get all the books from database
router.get("/", async (request, response) => {
  try {
    // request made to get all books
    const tanks = await Tank.find({});

    // response returned from request
    return response.status(200).json({
      count: tanks.length,
      data: tanks,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
