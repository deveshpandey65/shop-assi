'use client';
import React, { useState } from 'react';
import api from '@/utils/api';

export default function AddCategoryModal({ onClose }) {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [taxApplicable, setTaxApplicable] = useState(false);
    const [tax, setTax] = useState(0);
    const [taxType, setTaxType] = useState('none');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/categories', {
                name,
                image,
                description,
                taxApplicable,
                tax,
                taxType
            });
            alert('Category added successfully!');
            onClose();
        } catch (err) {
            console.error(err);
            alert('Failed to add category.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-2xl shadow-xl w-96">
                <h2 className="text-2xl font-bold mb-4">Add Category</h2>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        type="text"
                        placeholder="Category Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border rounded-lg p-2"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="w-full border rounded-lg p-2"
                    />
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border rounded-lg p-2"
                    />
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={taxApplicable}
                            onChange={(e) => setTaxApplicable(e.target.checked)}
                        />
                        <label>Tax Applicable</label>
                    </div>
                    {taxApplicable && (
                        <>
                            <input
                                type="number"
                                placeholder="Tax Amount"
                                value={tax}
                                onChange={(e) => setTax(e.target.value)}
                                className="w-full border rounded-lg p-2"
                            />
                            <select
                                value={taxType}
                                onChange={(e) => setTaxType(e.target.value)}
                                className="w-full border rounded-lg p-2"
                            >
                                <option value="percentage">Percentage</option>
                                <option value="flat">Flat</option>
                                <option value="none">None</option>
                            </select>
                        </>
                    )}
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 border rounded-lg hover:bg-gray-100">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
