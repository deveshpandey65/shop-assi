'use client';
import React, { useState } from 'react';
import AddCategoryModal from './modals/AddCategoryModal';
import AddSubCategoryModal from './modals/AddSubCategoryModal';
import AddProductModal from './modals/AddProductModal';

export default function Header() {
    const [showMenu, setShowMenu] = useState(false);
    const [openModal, setOpenModal] = useState(null); 

    const handleOpenModal = (type) => {
        setOpenModal(type);
        setShowMenu(false);
    };

    const closeModal = () => setOpenModal(null);

    return (
        <div>
        <header className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 backdrop-blur-lg border-b border-gray-200 py-4 px-8 md:px-12 flex justify-between items-center shadow-lg transition-all duration-300">
            <h1 className="text-3xl font-extrabold text-blue-600 tracking-tight">ShopSmart</h1>

            {/* Admin Add Menu */}
            <div className="relative">
                <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
                >
                    Add
                </button>

                {/* Dropdown */}
                {showMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                        <button
                            onClick={() => handleOpenModal('category')}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                        >
                            Add Category
                        </button>
                        <button
                            onClick={() => handleOpenModal('subCategory')}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                        >
                            Add SubCategory
                        </button>
                        <button
                            onClick={() => handleOpenModal('product')}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                        >
                            Add Product
                        </button>
                    </div>
                )}
            </div>

            </header>
         {/* Modals */ }
    { openModal === 'category' && <AddCategoryModal onClose={closeModal} /> }
    { openModal === 'subCategory' && <AddSubCategoryModal onClose={closeModal} /> }
    { openModal === 'product' && <AddProductModal onClose={closeModal} /> }
</div>
    );
}
