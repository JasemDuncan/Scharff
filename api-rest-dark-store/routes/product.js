const express  = require("express")
const router = express.Router();
const ProductController = require("../controllers/product");

router.get("/product",ProductController.test)

module.exports = router;