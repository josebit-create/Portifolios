const { body } = require("express-validator");

const requestValidate = () => {
  return [
    body("requestName")
      .isString()
      .withMessage("O título da solcitação é obrigatório.")
      .isLength({ min: 3 })
      .withMessage("O título precisa ter pelo menos 3 caracteres."),
    body("requestMethodPayment")
      .isString()
      .withMessage("Informe o metódo de pagamento."),
    body("requestAddress.cep")
      .isString()
      .withMessage("O CEP do endereço é obrigatório")
      .isLength({ min: 8 })
      .withMessage("CEP inválido."),
    body("requestAddress.road")
      .isString()
      .withMessage("O nome da rua é obrigatório."),
    body("requestAddress.homeNumber")
      .isString()
      .withMessage("O número da casa é obrigatório."),
    body("requestAddress.neighborhood")
      .isString()
      .withMessage("O nome do bairro é obrigatório."),
    body("requestAddress.city")
      .isString()
      .withMessage("O nome da cidade é obrigatório."),
  ];
};

const updateRequestValidate = () => {
  return [
    body("requestName")
      .optional()
      .isLength({ min: 3 })
      .withMessage("O título precisa ter pelo menos 3 caracteres."),
    body("requestAddress.cep")
      .optional()
      .isLength({ min: 8 })
      .withMessage("CEP inválido."),
  ];
};

module.exports = {
  requestValidate,
  updateRequestValidate,
};
