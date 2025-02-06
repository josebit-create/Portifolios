const Request = require("../models/Request");
const mongoose = require("mongoose");
const User = require("../models/User");

const insertRequest = async (req, res) => {
  const {
    requestName,
    requestProds,
    requestMethodPayment,
    requestAddress,
    requestSituation,
  } = req.body;

  const reqUser = req.user;

  const user = await User.findById(reqUser._id);

  const newRequest = await Request.create({
    requestName,
    requestProds,
    requestMethodPayment,
    requestAddress,
    requestSituation,
    userId: user._id,
  });

  if (!newRequest) {
    res.status(422).json({
      errors: [
        "Houve um problema inesperado. Por favor tente novamente mais tarde.",
      ],
    });
    return;
  }

  res.status(201).json({
    newRequest,
    message: "Solicitação de compra feita com sucesso!",
  });
};

const deleteRequest = async (req, res) => {
  const { id } = req.params;

  try {
    const request = await Request.findById(new mongoose.Types.ObjectId(id));

    if (!request) {
      res.status(404).json({
        errors: ["Solicitação não encontrada."],
      });
      return;
    }

    await Request.findByIdAndDelete(request._id);

    res.status(200).json({
      message: "Solicitação cancelada com sucesso.",
    });
  } catch (error) {
    res.status(404).json({
      errors: ["Solicitação não encontrada."],
    });
  }
};

const updateRequest = async (req, res) => {
  const { id } = req.params;
  const {
    requestName,
    requestProds,
    requestMethodPayment,
    requestAddress,
    requestSituation,
  } = req.body;

  const request = await Request.findById(id);

  if (!request) {
    res.status(404).json({
      errors: ["Solicitação não encontrada."],
    });
    return;
  }

  if (requestName) {
    request.requestName = requestName;
  }
  if (requestProds) {
    request.requestProds = requestProds;
  }
  if (requestMethodPayment) {
    request.requestMethodPayment = requestMethodPayment;
  }
  if (requestAddress) {
    request.requestAddress = requestAddress;
  }
  if (requestSituation) {
    request.requestSituation = requestSituation;
  }

  await request.save();

  res.status(200).json({
    request,
    message: "Solicitação atualizada com sucesso!",
  });
};

const getAllRequests = async (req, res) => {
  const requests = await Request.find({})
    .sort([["createdAt", -1]])
    .exec();

  res.status(200).json(requests);
};

const getUserRequests = async (req, res) => {
  const { id } = req.params;

  const reqUser = req.user;

  if (!reqUser._id === id) {
    res.status(422).json({
      errors: [
        "Houve um problema inesperado. Por favor tente novamente mais tarde.",
      ],
    });
    return;
  }

  const requests = await Request.find({ userId: id })
    .sort([["createdAt", -1]])
    .exec();

  res.status(200).json(requests);
};

const getRequestById = async (req, res) => {
  const { id } = req.params;

  const request = await Request.findById(new mongoose.Types.ObjectId(id));

  if (!request) {
    res.status(404).json({
      errors: ["Solicitação não encontrada."],
    });
    return;
  }

  res.status(200).json(request);
};

const searchRequest = async (req, res) => {
  const { q } = req.query;

  const requests = await Request.find({
    requestName: new RegExp(`^${q}`, "i"),
  }).exec();

  res.status(200).json(requests);
};

module.exports = {
  insertRequest,
  deleteRequest,
  updateRequest,
  getAllRequests,
  getRequestById,
  getUserRequests,
  searchRequest,
};
