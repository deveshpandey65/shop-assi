import React from 'react'
import ProductCard from './ProductCard'

export default function Products({ filteredProducts }) {
    if (filteredProducts.length === 0) {
        return (
            <section>
                <h2 className="text-4xl font-extrabold mb-8 text-gray-500">Products</h2>
                <p className="text-gray-500">No products available.</p>
            </section>
        );
    }
  return (
      <section>
          <h2 className="text-4xl font-extrabold mb-8 text-gray-500">Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map(product => (
                  <ProductCard
                      key={product._id} 
                        product={product}
                />
              ))}
          </div>
      </section>  )
}
