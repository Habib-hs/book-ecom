const express = require("express");
const productController = require("../controller/productController");
const router = express.Router();
const {verifyAdmin, verifyToken, verifyUser} = require("../utlis/verifyToken")




//router.get("/Products/list", verifyToken, verifyAdmin , productController.getProducts);
// router.get("/Products/:userId",verifyToken, verifyAdmin , productController.getProducts);
router.get("/Products", productController.getProducts);
router.get("/Products/related/:productId", productController.getRelatedProducts);

router.get("/Products/categories", productController.getCategories);
router.get("/products/search", productController.listSearch);
router.post("/products/by/search", productController.listBySearch);
router.get("/product/photo/:productId", productController.sendPhoto);

router.post("/product/create/:userId", productController.createProduct);
router.delete("/Product/:productId", productController.deleteProduct)
router.put("/Product/:productId",productController.updateProduct)

router
 .route("/product/:productId")
 .get(productController.getProduct)


module.exports = router;
