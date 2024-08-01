const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  name: String,
  price: String,
  description: String,
  section: String,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
