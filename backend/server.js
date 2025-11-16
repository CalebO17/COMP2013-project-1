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

//GET-ting data from product database (Read from CRUD)
server.get("/products", async (request, response) => {
  try {
    const products = await Product.find();
    response.send(products);
  } catch (error) {
    server.status(500).send({ message: error.message });
  }
});

//POST to add a new product to the database (CREATE of CRUD)
server.post("/products", async (request, response) => {
  const { productName, brand, image, price } = request.body;
  const newProduct = new Product({
    //New product is defined using "Product" created in the models folder
    productName,
    brand,
    image,
    price,
  });
  try {
    await newProduct.save();
    response.status(200).send({
      message: `Product is added successfully`,
      date: new Date(Date.now()), // Using date so it sends a different message each time and it knows to rerender
    });
  } catch (error) {
    response.status(400).send({ message: error.message });
  }
});

//To DELETE a product from the database by its _id (DELETE of CRUD)
server.delete("/products/:id", async (request, response) => {
  const { id } = request.params; //Grabbing id from parameters
  try {
    await Product.findByIdAndDelete(id); //Finding and removing the product with the matching grabbed id
    response.send({ message: `Product deleted`, date: new Date(Date.now()) }); //Using date so its a different response everytime it sends and it rerenders
  } catch (error) {
    response.status(400).send({ message: error.message });
  }
});

//To GET one product by id (read of CRUD)
server.get("/products/:id", async (request, response) => {
  const { id } = request.params; //Getting id from parameters
  try {
    const productToEdit = await Product.findById(id); //Finding id from grabbed parameters id
    response.send(productToEdit);
  } catch (error) {
    response.status(500).send(error.message({ message: error.message }));
  }
});

//To PATCH a contact by id (update of CRUD)
server.patch("/products/:id", async (request, response) => {
  const { id } = request.params; //Getting id from parameters
  const { productName, brand, image, price } = request.body;
  try {
    await Product.findByIdAndUpdate(id, {
      //Finding the id grabbed from the parameters and updating
      productName,
      brand,
      image,
      price,
    });
    response.send({
      message: `Product has been updated`, //Sending message and date so that the re-rendering happens everytime because the date will be different every time
      date: new Date(Date.now()),
    });
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});
