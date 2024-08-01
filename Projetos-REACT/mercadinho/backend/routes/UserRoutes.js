const express = require("express");

const router = express.Router();

const {
  register,
  login,
  getCurrentUser,
  updateUser,
  getUserById,
  deleteUser,
} = require("../controllers/UserController");

const {
  userValidation,
  loginValidation,
  updateValidation,
} = require("../middlewares/userValidation");
const validate = require("../middlewares/handleValidate");
const authGuard = require("../middlewares/authGuard");
const authorizeAdminRegistration = require("../middlewares/authorizeAdminRegistration ");

router.post(
  "/register",
  userValidation(),
  authorizeAdminRegistration,
  validate,
  register
);
router.post("/login", loginValidation(), validate, login);
router.get("/profile", authGuard, getCurrentUser);
router.put("/", authGuard, updateValidation(), validate, updateUser);
router.get("/:id", getUserById);
router.delete("/:id", authGuard, deleteUser);

module.exports = router;
