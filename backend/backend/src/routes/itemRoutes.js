const express = require("express");
const {
    createItem,
    getItems,
    getItemsByCategory,
    getItemsBySubCategory,
    getItemByIdOrName,
    editItem,
    searchItem,
}= require("../controllers/itemController.js");

const router = express.Router();

router.post("/", createItem);
router.get("/", getItems);
router.get("/category/:categoryId", getItemsByCategory);
router.get("/subcategory/:subCategoryId", getItemsBySubCategory);
router.get("/search", getItemByIdOrName);
router.put("/:id", editItem);
router.get("/find", searchItem);

module.exports = router;
