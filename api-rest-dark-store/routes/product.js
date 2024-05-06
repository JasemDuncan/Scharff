const express  = require("express");
const multer = require("multer");
const ProductController = require("../controllers/product");

const router = express.Router();
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './images/products/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const uploads = multer({storage: storage});

const baseURL = "https://localhost:443"; // Cambiar el puerto si es diferente


router.post("/products",ProductController.create);
router.put("/products/:id",ProductController.update);
router.get("/products",ProductController.list);
router.get("/products/:id",ProductController.one);

router.delete("/products/:id",ProductController.deleteOne);
router.post("/upload_image/:id",[uploads.single("file")],ProductController.uploadImage);
router.get("/image/:file",ProductController.image);
router.get("/search/:search",ProductController.search);


// Actualiza todas las rutas para usar HTTPS y el puerto correspondiente
for (let route of router.stack) {
    if (route.route && route.route.path) {
        route.route.path = baseURL + route.route.path;
    }
}


module.exports = router;