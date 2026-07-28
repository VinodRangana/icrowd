import React from 'react';
import { useParams } from 'react-router-dom';
import { useProductDetail } from '../hooks/useProductDetail';
import { useProducts } from '../hooks/useProducts';
import ProductGrid from '../components/ProductGrid';

const ProductDetailPage = () => {
  const { id } = useParams();
  
  // 1. Fetch the main product
  const { product, loading, error } = useProductDetail(id);
  
  // 2. Fetch all products to pick some "suggestions"
  // In a real app, we might have a specific endpoint for related products!
  const { products: allProducts } = useProducts(); 
  const suggestedProducts = allProducts
    .filter(p => p.id !== Number(id))
    .slice(0, 4);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-32">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center p-10 bg-red-500/10 rounded-2xl border border-red-500/20 max-w-2xl mx-auto my-20">
        <h2 className="text-red-400 text-xl font-bold mb-2">Oops!</h2>
        <p className="text-red-200">{error || "Product not found."}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      
      {/* 1. Product Description Component */}
      <div className="flex flex-col md:flex-row gap-12 mb-20 bg-surface/30 p-6 md:p-12 rounded-3xl border border-slate-700/50">
        
        {/* Left: Image */}
        <div className="lg:w-1/2">
          <div className="aspect-square bg-slate-800 rounded-3xl overflow-hidden border border-slate-700/50 shadow-2xl relative">
            <img 
              src={product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls[0] : ''} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
            
            {/* Gallery thumbnails could go here later if we want to display multiple images */}
            {product.imageUrls && product.imageUrls.length > 1 && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {product.imageUrls.map((url, i) => (
                   <div key={i} className="w-12 h-12 rounded-lg bg-slate-900 border border-slate-600 overflow-hidden">
                     <img src={url} className="w-full h-full object-cover" />
                   </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Details */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          {/* Category & Tags */}
          <div className="mb-4">
            <Link to={`/search?category=${encodeURIComponent(product.category?.name || '')}`} className="inline-block text-primary font-bold tracking-widest uppercase text-sm mb-2 hover:underline">
              {product.category?.name || 'Category'}
            </Link>
            
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {product.tags.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1 bg-slate-800 text-xs text-slate-400 rounded-full border border-slate-700">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            {product.name}
          </h1>
          
          <p className="text-2xl font-bold text-slate-300 mb-6">
            ${product.price.toFixed(2)}
          </p>
          
          <p className="text-slate-400 leading-relaxed mb-10">
            {product.description}
          </p>

          <div className="flex items-center gap-4 mb-6">
            <div className={`w-3 h-3 rounded-full ${product.availableStock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-slate-300 font-medium">
              {product.availableStock > 0 ? `${product.availableStock} in stock` : 'Out of stock'}
            </span>
          </div>

          <button 
            disabled={product.availableStock === 0}
            className="w-full md:w-auto bg-primary hover:bg-primary/90 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-4 px-12 rounded-2xl transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 active:scale-95 text-lg"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* 2. Product Feedback / Reviews (Dummy Component) */}
      <div className="mb-20 bg-surface/50 p-8 rounded-3xl border border-slate-700/50">
        <h3 className="text-2xl font-bold text-white mb-6">Customer Feedback</h3>
        <p className="text-slate-400 italic">No reviews yet. Be the first to review this product!</p>
      </div>

      {/* 3. Product Grid (Reused for Suggestions!) */}
      <ProductGrid 
        products={suggestedProducts} 
        title="You Might Also Like"
      />

    </div>
  );
};

export default ProductDetailPage;
