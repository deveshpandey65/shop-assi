const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");

router.use("/auth", authRoutes);
// router.use("/search", require("./searchRoutes"));
router.use("/items", require("./itemRoutes"));
router.use("/subcategories", require("./subCategoryRoutes"));
router.use("/categories", require("./categoryRoutes"));
// Test route to verify routing
router.get("/test", (req, res) => {
    res.json({ msg: "Auth route working!" });
});

module.exports = router;
