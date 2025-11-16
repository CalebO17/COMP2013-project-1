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

//POST to add a new product to the database
server.post("/products", async (request, response) => {
  const { productName, brand, image, price } = request.body;
  const newProduct = new Product({
    productName,
    brand,
    image,
    price,
  });
  try {
    await newProduct.save();
    response.status(200).send({
      message: `Product is added successfully`,
      date: new Date(Date.now()),
    });
  } catch (error) {
    response.status(400).send({ message: error.message });
  }
});

//To DELETE a product from the database by its _id
server.delete("/products/:id", async (request, response) => {
  const { id } = request.params;
  try {
    await Product.findByIdAndDelete(id);
    response.send({ message: `Product deleted`, date: new Date(Date.now()) });
  } catch (error) {
    response.status(400).send({ message: error.message });
  }
});

//To GET one product by id
server.get("/products/:id", async (request, response) => {
  const { id } = request.params;
  try {
    const productToEdit = await Product.findById(id);
    response.send(productToEdit);
  } catch (error) {
    response.status(500).send(error.message({ message: error.message }));
  }
});

//To PATCH a contact by id
server.patch("/products/:id", async (request, response) => {
  const { id } = request.params;
  const { productName, brand, image, price } = request.body;
  try {
    await Product.findByIdAndUpdate(id, {
      productName,
      brand,
      image,
      price,
    });
    response.send({
      message: `Product has been updated`,
      date: new Date(Date.now()),
    });
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});
