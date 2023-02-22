const { GetUser } = require("../controller/UserController");
const { Protected } = require("../middleware/AuthMiddleware");

const router = require("express").Router();
router.get("/", Protected, GetUser);

module.exports = router;
