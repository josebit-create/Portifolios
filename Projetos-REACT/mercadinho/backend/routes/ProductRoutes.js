const express = require("express");
const router = express.Router();

const {
  insertProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
  getProductById,
  getProductBySection,
} = require("../controllers/ProductController");
const { productCreateValidation } = require("../middlewares/productValidation");
const validate = require("../middlewares/handleValidate");
const authGuard = require("../middlewares/authGuard");

router.post("/", productCreateValidation(), authGuard, validate, insertProduct);
router.get("/", getAllProducts);
router.get("/:section", getProductBySection);
router.get("/:id", getProductById);
router.delete("/:id", authGuard, deleteProduct);
router.put(
  "/:id",
  productCreateValidation(),
  authGuard,
  validate,
  updateProduct
);

module.exports = router;
