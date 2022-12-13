const express = require("express");
const categoryController = require("../controller/categoryController");
const router = express.Router();
const {
  verifyAdmin,
  verifyToken,
  verifyUser,
} = require("../utlis/verifyToken");

router.post(
  "/category/create/:userid",
  categoryController.createCategory
);
router.get("/Category/:categoryId", categoryController.getCategory);

router.get(
  "/Categories",
 
  categoryController.getCategories
);
router.delete("/Category/:categoryId", categoryController.deleteCategory);

router.put("/Category/:categoryId", categoryController.updateCategory);

module.exports = router;
