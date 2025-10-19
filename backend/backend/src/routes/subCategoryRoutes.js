const express= require("express");
const {
    createSubCategory,
    getSubCategories,
    getSubCategoriesByCategory,
    getSubCategoryByIdOrName,
    editSubCategory,
} = require("../controllers/subCategoryController.js");

const router = express.Router();

router.post("/", createSubCategory);
router.get("/", getSubCategories);
router.get("/category/:categoryId", getSubCategoriesByCategory);
router.get("/search", getSubCategoryByIdOrName);
router.put("/:id", editSubCategory);



module.exports = router;