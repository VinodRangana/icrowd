import React from 'react';
import ProductGrid from '../components/ProductGrid';
import { useProducts } from '../hooks/useProducts';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  // Fetch products (for now, fetching all active products)
  const { products, loading, error } = useProducts();

  return (
    <div className="w-full">
      {/* Hero Banner Component (Inline for now to keep it simple, but we can extract it later) */}
      <div className="relative bg-gradient-to-r from-primary/20 to-secondary/20 overflow-hidden border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 py-20 lg:py-32 relative z-10 flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6 drop-shadow-lg">
            Upgrade Your Tech.
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mb-10">
            Premium mobile accessories curated for the modern lifestyle. Fast shipping, secure checkout, and top-tier quality.
          </p>
          <Link to="/search" className="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-10 rounded-2xl transition-all shadow-lg shadow-primary/30 hover:shadow-primary/50 text-lg hover:-translate-y-1">
            Shop Now
          </Link>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 text-center">
          Browse by Category
        </h3>
        <div className="flex flex-wrap justify-center gap-4">
          {['Headset', 'PowerBank', 'Case'].map(cat => (
            <Link 
              key={cat} 
              to={`/search?category=${cat}`}
              className="bg-surface/50 border border-slate-700 hover:border-primary/50 text-white px-8 py-4 rounded-2xl backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 font-medium"
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products using our highly reusable ProductGrid! */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <ProductGrid 
          products={products.slice(0, 4)} // Just show top 4 featured
          loading={loading}
          error={error}
          title="Featured Accessories"
          subtitle="Hand-picked essentials for your devices."
        />
      </div>
    </div>
  );
};

export default LandingPage;
