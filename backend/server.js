// Initializing server
const express = require("express");
const server = express();
const port = 3000;
const mongoose = require("mongoose"); // Importing mongoose
require("dotenv").config(); // Importing dotenv
const { DB_URI } = process.env; // Grabbing the same variable from the dotenv file
const cors = require("cors"); // For disabling default browser security
const Product = require("./models/product"); // Importing the model schema

//Middleware
server.use(express.json()); // To ensure data is transmitted as json
server.use(express.urlencoded({ extended: true })); // Ensure data is encoded and decoded while transmitting
server.use(cors());

//Database connection and server listening
mongoose
  .connect(DB_URI)
  .then(() => {
    server.listen(port, () => {
      console.log(`Database is connected\nServer is listening on ${port}`);
    });
  })
  .catch((error) => console.log(error.message));

//Routes
//Root route
server.get("/", (request, response) => {
  response.send("Server is live");
});

//GET-ting data from product database
server.get("/products", async (request, response) => {
  try {
    const products = await Product.find();
    response.send(products);
  } catch (error) {
    server.status(500).send({ message: error.message });
  }
});
