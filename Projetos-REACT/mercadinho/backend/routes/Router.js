const express = require("express");
const router = express();

router.use("/api/products", require("./ProductRoutes"));
router.use("/api/users", require("./UserRoutes"));
router.use("/api/cart", require("./CartRoutes"));
router.use("/api/requests", require("./RequestRoutes"));

router.get("/", (req, res) => {
  res.send("API funcionando!");
});

module.exports = router;
