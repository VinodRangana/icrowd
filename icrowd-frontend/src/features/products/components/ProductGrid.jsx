import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products = [], pagination, onPageChange, title, subtitle, loading, error }) => {
  
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-10 bg-red-500/10 rounded-2xl border border-red-500/20 max-w-2xl mx-auto my-10">
        <h2 className="text-red-400 text-xl font-bold mb-2">Oops!</h2>
        <p className="text-red-200">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Optional Title Section */}
      {(title || subtitle) && (
        <div className="mb-8 text-center space-y-2">
          {title && (
            <h2 className="text-3xl font-black tracking-tight text-white">
              {title}
            </h2>
          )}
          {subtitle && <p className="text-text-muted">{subtitle}</p>}
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {/* Empty State */}
      {products.length === 0 && !loading && !error && (
        <div className="text-center py-20 text-slate-400">
          No products found.
        </div>
      )}

      {/* Pagination Controls */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center bg-surface/50 p-4 rounded-2xl border border-slate-700/50">
          
          <div className="text-sm text-slate-400 mb-4 sm:mb-0">
            Showing <span className="font-bold text-white">{(pagination.number * pagination.size) + 1}</span> to <span className="font-bold text-white">{Math.min((pagination.number + 1) * pagination.size, pagination.totalElements)}</span> of <span className="font-bold text-white">{pagination.totalElements}</span> results
          </div>
          
          <div className="flex gap-2">
            <button 
              disabled={pagination.number === 0}
              onClick={() => onPageChange(pagination.number - 1)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:bg-slate-900 disabled:text-slate-600 disabled:cursor-not-allowed text-white rounded-xl transition-colors font-medium border border-slate-700/50"
            >
              Previous
            </button>
            
            <div className="flex items-center px-4 font-bold text-white bg-slate-900/50 rounded-xl border border-slate-700/50">
              Page {pagination.number + 1} of {pagination.totalPages}
            </div>

            <button 
              disabled={pagination.number >= pagination.totalPages - 1}
              onClick={() => onPageChange(pagination.number + 1)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:bg-slate-900 disabled:text-slate-600 disabled:cursor-not-allowed text-white rounded-xl transition-colors font-medium border border-slate-700/50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
