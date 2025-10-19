'use client';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import productApi from "@/utils/product";
import Products from '@/components/Products';
import withAuth from '@/hoc/withAuth';
import React, { useEffect, useRef, useState } from 'react';
import CategorySection from '@/components/CategotyProducts';
import api from '@/utils/api'; // Axios wrapper for category/subcategory

function App() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmedItemName, setConfirmedItemName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const totalItems = useRef(0);

  // Fetch products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await productApi.getProducts();
        setProducts(res);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);

  // Fetch categories & subcategories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/categories');
        setCategories(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!selectedCategory) {
      setSubCategories([]);
      setSelectedSubCategory('');
      return;
    }
    const fetchSubCategories = async () => {
      try {
        const res = await api.get(`/subcategories/category/${selectedCategory}`);
        setSubCategories(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSubCategories();
  }, [selectedCategory]);

  // Filter products
  const filteredProducts = products.filter(product => {
    let matchesSearch = product?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    let matchesCategory = selectedCategory ? product.categoryId === selectedCategory : true;
    let matchesSubCategory = selectedSubCategory ? product.subCategoryId === selectedSubCategory : true;
    return matchesSearch && matchesCategory && matchesSubCategory;
  });

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <style>{`
        @keyframes slideInUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-in-up {
          animation: slideInUp 0.5s ease-out forwards;
        }
      `}</style>

      {/* Header */}
      <Header />
      <div className='h-14'></div>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">

        

        {/* Category Section */}
        <CategorySection />

        {/* Products Section */}
        <div className="space-y-8">
          {/* Filter Section */}
          <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-6">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded-lg p-2 w-full md:w-1/3"
            />

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border rounded-lg p-2 w-full md:w-1/4"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>

            <select
              value={selectedSubCategory}
              onChange={(e) => setSelectedSubCategory(e.target.value)}
              className="border rounded-lg p-2 w-full md:w-1/4"
              disabled={!selectedCategory}
            >
              <option value="">All Subcategories</option>
              {subCategories.map(sub => (
                <option key={sub._id} value={sub._id}>{sub.name}</option>
              ))}
            </select>
          </div>
          <Products filteredProducts={filteredProducts} />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default withAuth(App);
