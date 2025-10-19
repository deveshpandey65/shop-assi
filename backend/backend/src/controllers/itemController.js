const Category = require("../models/Category");
const Item = require("../models/Item");

exports.createItem = async (req, res) => {
    try {
        const body = JSON.parse(req.body || "{}");
        const {
            name,
            description,
            image,
            categoryId,
            subCategoryId,
            baseAmount,
            discount = 0,
            taxApplicable,
            tax,
        } = body;

        // ✅ Validation
        if (!name || typeof name !== "string") {
            return res.status(400).json({ error: "Item name is required and must be a string." });
        }
        if (!categoryId) {
            return res.status(400).json({ error: "categoryId is required." });
        }
        if (typeof baseAmount !== "number" || baseAmount <= 0) {
            return res.status(400).json({ error: "baseAmount must be a positive number." });
        }
        if (discount < 0) {
            return res.status(400).json({ error: "Discount cannot be negative." });
        }

        // ✅ Check for duplicate item name
        const existing = await Item.findOne({ name: name.trim(), categoryId });
        if (existing) {
            return res.status(409).json({ error: "Item with this name already exists in this category." });
        }

        // ✅ Calculate total amount
        const totalAmount = baseAmount - discount;

        const item = new Item({
            name: name.trim(),
            description,
            image,
            categoryId,
            subCategoryId,
            baseAmount,
            discount,
            taxApplicable: taxApplicable ?? false,
            tax: taxApplicable ? tax : 0,
            totalAmount,
        });

        await item.save();

        res.status(201).json({
            message: "Item created successfully.",
            data: item,
        });
    } catch (error) {
        console.error("Error creating item:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};


exports.getItems = async (req, res) => {
    try {
        const items = await Item.find();
        if (items.length === 0) {
            return res.status(404).json({ message: "No items found." });
        }
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch items.", details: error.message });
    }
};


exports.getItemsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        if (!categoryId) return res.status(400).json({ error: "categoryId is required." });

        const category = await Category.findById(categoryId);
        if (!category) return res.status(404).json({ error: "Category not found." });

        const products = await Item.find({ categoryId });

        res.status(200).json({
            _id: category._id,
            name: category.name,
            description: category.description,
            products
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch items by category.", details: error.message });
    }
};



exports.getItemsBySubCategory = async (req, res) => {
    try {
        const { subCategoryId } = req.params;
        if (!subCategoryId) {
            return res.status(400).json({ error: "subCategoryId is required." });
        }

        const items = await Item.find({ subCategoryId });
        if (items.length === 0) {
            return res.status(404).json({ message: "No items found for this subcategory." });
        }

        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch items by subcategory.", details: error.message });
    }
};


exports.getItemByIdOrName = async (req, res) => {
    try {
        const { id, name } = req.query;

        if (!id && !name) {
            return res.status(400).json({ error: "Please provide either 'id' or 'name'." });
        }

        const item = id ? await Item.findById(id) : await Item.findOne({ name: name.trim() });

        if (!item) {
            return res.status(404).json({ error: "Item not found." });
        }

        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch item.", details: error.message });
    }
};


exports.editItem = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Item ID is required." });
        }

        const updateData = req.body;

        // Prevent duplicate name under same category
        if (updateData.name && updateData.categoryId) {
            const duplicate = await Item.findOne({
                name: updateData.name.trim(),
                categoryId: updateData.categoryId,
                _id: { $ne: id },
            });
            if (duplicate) {
                return res.status(409).json({ error: "Another item with this name exists in the same category." });
            }
        }

        const updated = await Item.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });

        if (!updated) {
            return res.status(404).json({ error: "Item not found." });
        }

        res.status(200).json({
            message: "Item updated successfully.",
            data: updated,
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to update item.", details: error.message });
    }
};


exports.searchItem = async (req, res) => {
    try {
        const { name } = req.query;
        if (!name) {
            return res.status(400).json({ error: "Please provide a name to search." });
        }

        const items = await Item.find({ name: new RegExp(name, "i") });
        if (items.length === 0) {
            return res.status(404).json({ message: "No items found matching your search." });
        }

        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: "Failed to search items.", details: error.message });
    }
};
