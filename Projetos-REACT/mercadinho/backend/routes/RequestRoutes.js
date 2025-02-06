const express = require("express");
const router = express.Router();

const authGuard = require("../middlewares/authGuard");
const {
  requestValidate,
  updateRequestValidate,
} = require("../middlewares/requestValidation");
const {
  insertRequest,
  deleteRequest,
  updateRequest,
  getRequestById,
  getAllRequests,
  getUserRequests,
  searchRequest,
} = require("../controllers/RequestControll");
const validate = require("../middlewares/handleValidate");

router.post("/", requestValidate(), authGuard, validate, insertRequest);
router.get("/", authGuard, getAllRequests);
router.get("/search", authGuard, searchRequest);
router.get("/user/:id", authGuard, getUserRequests);
router.get("/:id", authGuard, getRequestById);
router.delete("/:id", authGuard, deleteRequest);
router.put("/:id", authGuard, updateRequestValidate(), validate, updateRequest);

module.exports = router;
