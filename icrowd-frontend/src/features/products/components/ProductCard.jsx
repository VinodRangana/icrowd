import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const isOutOfStock = product.availableStock === 0;

  return (
    <div className="group relative bg-surface/50 backdrop-blur-md border border-slate-700/50 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-primary/20 hover:border-primary/50 hover:-translate-y-1 flex flex-col h-full">
      
      {/* Overlay Link - Makes the ENTIRE card clickable */}
      <Link to={`/product/${product.id}`} className="absolute inset-0 z-10">
        <span className="sr-only">View details for {product.name}</span>
      </Link>

      {/* Product Image */}
      <div className="aspect-square overflow-hidden bg-slate-800">
        <img 
          src={product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls[0] : ''} 
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${isOutOfStock ? 'opacity-50 grayscale' : ''}`}
        />
      </div>

      {/* Product Details */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">
            {product.category?.name || 'Category'}
          </span>
          
          {/* Stock Badges */}
          {isOutOfStock ? (
            <span className="text-xs font-medium text-red-400 bg-red-400/10 px-2 py-1 rounded-full">
              Out of Stock
            </span>
          ) : product.availableStock < 20 ? (
            <span className="text-xs font-medium text-amber-400 bg-amber-400/10 px-2 py-1 rounded-full">
              Low Stock
            </span>
          ) : null}
        </div>
        
        <h3 className="text-lg font-bold text-text-main mb-1 truncate group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        
        <p className="text-sm text-text-muted line-clamp-2 mb-4 flex-grow">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-black text-text-main">
            ${product.price.toFixed(2)}
          </span>
          
          {/* Add to Cart Button - Needs relative and z-20 to sit above the card's overlay link! */}
          <button 
            disabled={isOutOfStock}
            className="relative z-20 bg-primary hover:bg-primary/90 disabled:bg-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed disabled:shadow-none text-white font-medium py-2 px-4 rounded-xl transition-colors shadow-lg shadow-primary/25 active:scale-95"
            onClick={(e) => {
              // We will add to Cart logic in Phase 3 here
              console.log(`Added ${product.name} to cart`);
            }}
          >
            {isOutOfStock ? 'Sold Out' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
