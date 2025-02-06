const ProdCart = require("../models/ProdCart");
const User = require("../models/User");
const mongoose = require("mongoose");

const insertProdCart = async (req, res) => {
  const { name, price, amount } = req.body;

  const ReqUser = req.user;

  const user = await User.findById(ReqUser._id);

  if (!user) {
    res.status(422).json({
      errors: [
        "Houve um problema inesperado. Por favor, tente novamente mais tarde.",
      ],
    });
  }

  const prodCart = await ProdCart.findOne({ name, userId: user._id });

  if (prodCart) {
    prodCart.amount = prodCart.amount + 1;
    await prodCart.save();
    res
      .status(200)
      .json({ prodCart, message: "Produto adcionado ao carrinho!" });
    return;
  }

  const newProdCart = await ProdCart.create({
    name,
    price,
    amount,
    userId: user._id,
  });

  if (!newProdCart) {
    res.status(422).json({
      errors: [
        "Houve um problema inesperado. Por favor tente novamente mais tarde.",
      ],
    });
    return;
  }

  res.status(201).json({
    newProdCart,
    message: "Produto adicionado no carrinho!",
  });
};

const getProdsCart = async (req, res) => {
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

  const prodsCart = await ProdCart.find({ userId: id })
    .sort([["createdAt", -1]])
    .exec();

  res.status(200).json(prodsCart);
};

const updateProdCart = async (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;

  const reqUser = req.user;

  const prodCart = await ProdCart.findById(id);

  if (!prodCart.userId.equals(reqUser._id)) {
    res.status(422).json({
      errors: ["Ocorreu um erro, por favor tente novamente mais tarde."],
    });
    return;
  }

  if (amount) {
    prodCart.amount = amount;
  }

  await prodCart.save();

  res.status(200).json(prodCart);
};

const deleteProdCart = async (req, res) => {
  const { id } = req.params;

  const reqUser = req.user;

  try {
    const prodCart = await ProdCart.findById(id);

    if (!prodCart) {
      res.status(404).json({
        errors: ["Produto não encontrado."],
      });
      return;
    }

    if (!prodCart.userId.equals(reqUser._id)) {
      res.status(422).json({
        errors: [
          "Houve um problema inesperado. Por favor tente novamente mais tarde.",
        ],
      });
      return;
    }

    await ProdCart.findByIdAndDelete(prodCart._id);

    res.status(200).json({
      message: "Produto exluído do carrinho com sucesso!",
    });
  } catch (error) {
    res.status(404).json({
      errors: ["Produto não encontrado."],
    });
    return;
  }
};

module.exports = {
  insertProdCart,
  getProdsCart,
  updateProdCart,
  deleteProdCart,
};
