const mongoose = require("mongoose");
const { Schema } = mongoose;

const requestSchema = new Schema({
  requestName: String,
  requestProds: Array,
  requestMethodPayment: String,
  requestAddress: {
    cep: String,
    road: String,
    homeNumber: String,
    neighborhood: String,
    city: String,
  },
  requestSituation: String,
  userId: mongoose.ObjectId,
});

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
