const router = require("express").Router();
const {
  GetProduct,
  GetProductById,
} = require("../controller/ProductController");
const { Protected } = require("../middleware/AuthMiddleware");

router.get("/products", Protected, GetProduct);
router.get("/product/:id", Protected, GetProductById);
module.exports = router;
