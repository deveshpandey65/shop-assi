'use client';
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import productApi from '@/utils/product';
import { useParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';

export default function ProductDetailPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await productApi.getProductById(id);
                setProduct(res);

                if (res?.category) {
                    const simRes = await productApi.getSimilarProducts({ productId: res._id });
                    setSimilarProducts(simRes.items.filter(p => p._id !== id));
                }
            } catch (error) {
                console.error("Error fetching product or similar products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    

    if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-600">Loading product...</div>;
    if (!product) return <div className="min-h-screen flex items-center justify-center text-gray-600">Product not found.</div>;

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Header />
            <div className='h-14'></div>

            <main className="flex-1 flex flex-col items-center px-4 md:px-8 py-8 space-y-16">
                <div className="max-w-4xl w-full flex flex-col md:flex-row gap-12 bg-white p-8 rounded-3xl shadow-xl border border-gray-200">
                    <div className="md:w-1/2">
                        <img src={product.image} alt={product.name} className="w-full h-auto object-cover rounded-2xl shadow-md" />
                    </div>

                    <div className="md:w-1/2 flex flex-col justify-between space-y-6">
                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-5xl font-extrabold text-blue-600">{product.name}</h2>
                            <p className="text-2xl font-bold text-gray-900">${product.baseAmount?.toFixed(2) || "0.00"}</p>
                            <p className="text-sm text-gray-500 uppercase">{product.category}</p>
                            <p className="text-gray-700 leading-relaxed">{product.description}</p>
                        </div>

                        
                    </div>
                </div>

                
            </main>

           
            <Footer />
        </div>
    );
}
