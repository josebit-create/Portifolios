const Product = require("../models/Product");
const mongoose = require("mongoose");

const insertProduct = async (req, res) => {
  const { name, price, section, description } = req.body;

  const prod = await Product.findOne({ name });

  if (prod) {
    res.status(422).json({
      errors: ["O produto já existe."],
    });
    return;
  }

  const newProduct = await Product.create({
    name,
    price,
    description,
    section,
  });

  if (!newProduct) {
    res.status(422).json({
      errors: [
        "Houve um erro ao carregar. Por favor tente novamente mais tarde.",
      ],
    });
    return;
  }

  res.status(201).json(newProduct);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const prod = await Product.findById(new mongoose.Types.ObjectId(id));

    if (!prod) {
      res.status(404).json({
        errors: ["Produto não encontrado."],
      });
      return;
    }

    await Product.findByIdAndDelete(prod._id);

    res.status(200).json({
      message: "Produto excluido com sucesso.",
    });
  } catch (error) {
    res.status(404).json({
      errors: ["Produto não encontrado."],
    });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, description, section } = req.body;

  const prod = await Product.findById(id);

  if (!prod) {
    res.status(404).json({
      errors: ["Produto não encontrado."],
    });
    return;
  }

  if (name) {
    prod.name = name;
  }

  if (price) {
    prod.price = price;
  }

  if (description) {
    prod.description = description;
  }

  if (section) {
    prod.section = section;
  }

  await prod.save();

  res.status(200).json({
    prod,
    message: "Produto atualizado com sucesso!",
  });
};

const getAllProducts = async (req, res) => {
  const products = await Product.find({})
    .sort([["createdAt", -1]])
    .exec();

  res.status(200).json(products);
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  const prod = await Product.findById(id);

  if (!prod) {
    res.status(404).json({
      errors: ["Produto não encontrado."],
    });
    return;
  }

  res.status(200).json(prod);
};

const getProductBySection = async (req, res) => {
  const { section } = req.params;

  const prods = await Product.find({ section: section })
    .sort([["createdAt", -1]])
    .exec();

  if (prods.length === 0) {
    res.status(404).json({
      errors: ["Seção não encontrada."],
    });
    return;
  }

  res.status(200).json(prods);
};

const searchProducts = async (req, res) => {
  const { q } = req.query;

  const products = await Product.find({
    name: new RegExp(`^${q}`, "i"),
  }).exec();

  res.status(200).json(products);
};

module.exports = {
  insertProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
  getProductById,
  getProductBySection,
  searchProducts,
};
