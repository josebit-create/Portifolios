const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProdCartSchema = new Schema({
  name: String,
  price: Number,
  amount: Number,
  userId: mongoose.ObjectId,
});

const ProdCart = mongoose.model("ProdCart", ProdCartSchema);

module.exports = ProdCart;
