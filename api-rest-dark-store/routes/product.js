const express  = require("express");
const multer = require("multer");
const ProductController = require("../controllers/product");

const router = express.Router();
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './images/products/')
    },
    filename: function (req, file, cb) {
        cb(null, "product"+Date.now()+file.originalname);
    }
});
const uploads = multer({storage: storage});

router.post("/products",ProductController.create);
router.put("/products/:id",ProductController.update);
router.get("/products",ProductController.list);
router.get("/products/:id",ProductController.one);

router.delete("/products/:id",ProductController.deleteOne);
router.post("/upload_image/:id",[uploads.single("file")],ProductController.uploadImage);
router.get("/image/:file",ProductController.image);
router.get("/search/:search",ProductController.search);


module.exports = router;