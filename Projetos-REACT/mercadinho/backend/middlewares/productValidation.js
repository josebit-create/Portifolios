const { body } = require("express-validator");

const productCreateValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("O nome do produto é obrigatório.")
      .isLength({ min: 3 })
      .withMessage("O nome precisa ter pelo menos 3 caracteres."),
    body("price")
      .isString()
      .withMessage("O preço do produto é obrigatório.")
      .isLength({ min: 3 })
      .withMessage("O preço deve ter no mínimo três caracteres."),
    body("description")
      .isString()
      .withMessage("A descrição do produto é obrigatória.")
      .isLength({ min: 5 })
      .withMessage("A descrição deve ter no mínimo 5 caracteres."),
    body("section")
      .isString()
      .withMessage("A seção do produto é obrigatória.")
      .isLength({ min: 3 })
      .withMessage("A seção deve ter no mínimo três caracteres."),
  ];
};

module.exports = {
  productCreateValidation,
};
