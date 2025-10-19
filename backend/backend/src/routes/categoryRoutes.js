const  express = require("express");
const {
    createCategory,
    getCategories,
    getCategoryByIdOrName,
    editCategory,
    getCategoriesByLimit,
    
} = require("../controllers/categoryController.js");

const router = express.Router();

router.post("/", createCategory);
router.get("/", getCategories);
router.get('/category/limit/4', getCategoriesByLimit);
router.get("/search", getCategoryByIdOrName);
router.put("/:id", editCategory);

module.exports = router;
