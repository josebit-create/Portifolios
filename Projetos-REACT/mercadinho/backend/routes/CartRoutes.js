const express = require("express");
const router = express.Router();

const authGuard = require("../middlewares/authGuard");
const {
  insertProdCart,
  getProdsCart,
  updateProdCart,
  deleteProdCart,
} = require("../controllers/CartController");

router.post("/", authGuard, insertProdCart);
router.get("/:id", authGuard, getProdsCart);
router.put("/:id", authGuard, updateProdCart);
router.delete("/:id", authGuard, deleteProdCart);

module.exports = router;
