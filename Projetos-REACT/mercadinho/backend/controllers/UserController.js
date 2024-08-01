const User = require("../models/User");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: "7d",
  });
};

const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    res.status(422).json({
      errors: ["Por favor, utilize outro e-mail."],
    });
    return;
  }

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    password: passwordHash,
    role: role || "user",
  });

  if (!newUser) {
    res.status(422).json({
      errors: [
        "Houve um problema inesperado, por favor tente novamente mais tarde.",
      ],
    });
    return;
  }

  res.status(201).json({
    _id: newUser._id,
    token: generateToken(newUser._id),
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).json({
      errors: ["Usuário não encontrado."],
    });
    return;
  }

  if (!(await bcrypt.compare(password, user.password))) {
    res.status(422).json({
      errors: ["Senha inválida."],
    });
    return;
  }

  res.status(201).json({
    _id: user._id,
    token: generateToken(user._id),
  });
};

const getCurrentUser = (req, res) => {
  const user = req.user;

  res.status(200).json(user);
};

const updateUser = async (req, res) => {
  const { name, password } = req.body;

  const reqUser = req.user;

  const user = await User.findById(
    new mongoose.Types.ObjectId(reqUser._id)
  ).select("-password");

  if (name) {
    user.name = name;
  }

  if (password) {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    user.password = passwordHash;
  }

  await user.save();

  res.status(200).json(user);
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(new mongoose.Types.ObjectId(id)).select(
      "-password"
    );

    if (!user) {
      res.status(404).json({
        errors: ["Usuário não encontrado."],
      });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({
      errors: ["Usuário não encontrado."],
    });
    return;
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    res.status(404).json({
      errors: ["Usuário não encontrado."],
    });
    return;
  }

  await User.findByIdAndDelete(user._id);

  res.status(200).json({
    message: "Usuário exluído com sucesso.",
  });
};

module.exports = {
  register,
  login,
  getCurrentUser,
  updateUser,
  getUserById,
  deleteUser,
};
