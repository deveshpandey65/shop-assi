const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: String,
    description: String,
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    subCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" },
    taxApplicability: { type: Boolean },
    tax: { type: Number },
    baseAmount: Number,
    discount: Number,
    totalAmount: Number,
});


module.exports = mongoose.model("Item", itemSchema);

