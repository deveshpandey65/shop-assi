const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");

exports.createSubCategory = async (req, res) => {
    try {
        const body = JSON.parse(req.body)   || "{}";

        const { name, image, description, taxApplicability, tax, categoryId } = body;

        // ✅ 1. Validation - required fields
        if (!name || !categoryId) {
            return res.status(400).json({
                error: "Name and categoryId are required fields."
            });
        }

        // ✅ 2. Check if category exists
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({
                error: "Category not found. Please provide a valid categoryId."
            });
        }

        // ✅ 3. Check for duplicate subcategory name in same category
        const existing = await SubCategory.findOne({ name, category: categoryId });
        if (existing) {
            return res.status(409).json({
                error: "SubCategory with this name already exists under the same category."
            });
        }

        // ✅ 4. Create new SubCategory
        const subCategory = new SubCategory({
            name,
            image,
            description,
            taxApplicability: !!taxApplicability,
            tax: tax || 0,
            category: categoryId
        });

        await subCategory.save();

        res.status(201).json({
            message: "SubCategory created successfully.",
            subCategory
        });

    } catch (error) {
        console.error("Error creating subcategory:", error);
        res.status(500).json({
            error: "Internal Server Error",
            details: error.message
        });
    }
};


// ✅ Fetch all subcategories
exports.getSubCategories = async (req, res) => {
    try {
        const subCategories = await SubCategory.find().populate("category", "name");
        res.json(subCategories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// ✅ Fetch subcategories by categoryId
exports.getSubCategoriesByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        if (!categoryId) {
            return res.status(400).json({ error: "categoryId is required." });
        }

        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ error: "Category not found." });
        }

        const subs = await SubCategory.find({ category: categoryId });
        res.json(subs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// ✅ Get subcategory by ID or name
exports.getSubCategoryByIdOrName = async (req, res) => {
    try {
        const { id, name } = req.query;

        if (!id && !name) {
            return res.status(400).json({ error: "Please provide either id or name as query parameter." });
        }

        const sub = id
            ? await SubCategory.findById(id).populate("category", "name")
            : await SubCategory.findOne({ name }).populate("category", "name");

        if (!sub) {
            return res.status(404).json({ error: "SubCategory not found." });
        }

        res.json(sub);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// ✅ Edit / Update subcategory
exports.editSubCategory = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "SubCategory ID is required." });
        }

        const updated = await SubCategory.findByIdAndUpdate(id, req.body, { new: true });

        if (!updated) {
            return res.status(404).json({ error: "SubCategory not found." });
        }

        res.json({
            message: "SubCategory updated successfully.",
            updated
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
