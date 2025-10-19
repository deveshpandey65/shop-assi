const mongoose = require('mongoose');

const SubcategorySchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    image: { type: String },
    description: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    taxApplicable: { type: Boolean },
    tax: { type: Number },
    taxType: { type: String, enum: ['percentage', 'flat', 'none'] }
}, { timestamps: true });


module.exports = mongoose.model('Subcategory', SubcategorySchema);