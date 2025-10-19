const Category = require("../models/Category");
const Item = require("../models/Item");

exports.createCategory = async (req, res) => {
    try {
        const body = JSON.parse(req.body || "{}");
        const { name, image, description, taxApplicable, tax, taxType } = body;

        // ✅ Validation
        if (!name || typeof name !== "string") {
            return res.status(400).json({ error: "Category name is required and must be a string." });
        }

        const existing = await Category.findOne({ name: name.trim() });
        if (existing) {
            return res.status(409).json({ error: "Category with this name already exists." });
        }

        const category = new Category({
            name: name.trim(),
            image,
            description,
            taxApplicable: taxApplicable ?? false,
            tax: taxApplicable ? tax : 0,
            taxType: taxApplicable ? taxType || "percentage" : null,
        });

        await category.save();
        res.status(201).json({
            message: "Category created successfully.",
            data: category,
        });
    } catch (error) {
        console.error("Error creating category:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        if (categories.length === 0) {
            return res.status(404).json({ message: "No categories found." });
        }
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch categories.", details: error.message });
    }
};
exports.getCategoriesByLimit = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 4;

        // Fetch all categories
        const categories = await Category.find();

        if (categories.length === 0) {
            return res.status(404).json({ message: "No categories found." });
        }

        // For each category, fetch up to 'limit' products
        const categoriesWithProducts = await Promise.all(
            categories.map(async (category) => {
                const products = await Item.find({ categoryId: category._id }).limit(limit);
                return {
                    ...category.toObject(),
                    products,
                };
            })
        );

        res.status(200).json(categoriesWithProducts);
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({
            error: "Failed to fetch categories.",
            details: error.message,
        });
    }
};

exports.getCategoryByIdOrName = async (req, res) => {
    try {
        const { id, name } = req.query;

        if (!id && !name) {
            return res.status(400).json({ error: "Please provide either category 'id' or 'name'." });
        }

        const category = id
            ? await Category.findById(id)
            : await Category.findOne({ name: name.trim() });

        if (!category) {
            return res.status(404).json({ error: "Category not found." });
        }

        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch category.", details: error.message });
    }
};

exports.editCategory = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "Category ID is required." });
        }

        const updateData = req.body;

        // Optional: Prevent updating name to an existing category’s name
        if (updateData.name) {
            const existing = await Category.findOne({ name: updateData.name.trim(), _id: { $ne: id } });
            if (existing) {
                return res.status(409).json({ error: "Another category with this name already exists." });
            }
        }

        const updated = await Category.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });

        if (!updated) {
            return res.status(404).json({ error: "Category not found." });
        }

        res.status(200).json({
            message: "Category updated successfully.",
            data: updated,
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to update category.", details: error.message });
    }
};
