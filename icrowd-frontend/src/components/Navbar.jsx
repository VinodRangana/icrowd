import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../features/products/components/SearchBar';
import { useProductFilters } from '../features/products/hooks/useProductFilters';

const Navbar = () => {
  const { keyword, setKeyword } = useProductFilters();

  return (
    <nav className="sticky top-0 z-50 bg-surface/80 backdrop-blur-lg border-b border-slate-700/50 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-2 mr-4 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-white font-black text-xl leading-none">i</span>
            </div>
            <span className="font-bold text-2xl tracking-tight text-white">Crowd</span>
          </Link>

          {/* Global Search Bar (Smart Container connects to Dumb UI) */}
          <div className="w-full max-w-xl flex-grow">
            <SearchBar 
              initialKeyword={keyword} 
              onSearch={setKeyword} 
              placeholder="Search products globally..."
            />
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-4 ml-4">
            <button className="text-slate-300 hover:text-white transition-colors font-medium">
              Login
            </button>
            <button className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-primary/20">
              Cart (0)
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
