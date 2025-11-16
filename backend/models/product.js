// Initializing the model schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Creating product schema
const productSchema = new Schema({
  id: {
    type: String,
    required: false, //false because I opted to use _id as the id specified in my components when mapping and doing
    // other things that require a key. I could have used the regular id and giving each submission of a form
    // a random id using the crypto.uuid, however I opted just to use _id instead. Therefore, having an "id"
    // is not a requirement, since "_id" is automatically generated anyways.
  },
  productName: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
});

//package and export the model
const Product = mongoose.model("Product", productSchema, "products");
module.exports = Product;
