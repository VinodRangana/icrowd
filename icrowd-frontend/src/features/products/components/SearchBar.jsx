import React from 'react';
import { Link } from 'react-router-dom';
import { useSearchAutocomplete } from '../hooks/useSearchAutocomplete';

const SearchBar = ({ initialKeyword, onSearch, placeholder = "Search headsets, powerbanks, cases..." }) => {
  const {
    keyword,
    setKeyword,
    suggestions,
    showSuggestions,
    setShowSuggestions,
    wrapperRef,
    handleSearch,
    handleSuggestionClick,
    handleCategoryClick
  } = useSearchAutocomplete(initialKeyword, onSearch);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-2xl mx-auto z-50">
      <form onSubmit={handleSearch}>
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <svg className="w-5 h-5 text-slate-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
        </div>
        <input 
          type="search" 
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => {
            if (suggestions.terms?.length > 0 || suggestions.products?.length > 0) setShowSuggestions(true);
          }}
          className="block w-full p-4 pl-12 text-sm text-white bg-surface/80 backdrop-blur-md border border-slate-700 rounded-2xl focus:ring-primary focus:border-primary outline-none shadow-lg transition-all" 
          placeholder={placeholder} 
        />
        <button 
          type="submit" 
          className="text-white absolute right-2.5 bottom-2.5 bg-primary hover:bg-primary/90 focus:ring-4 focus:outline-none focus:ring-primary/50 font-medium rounded-xl text-sm px-6 py-2 transition-colors shadow-lg shadow-primary/20"
        >
          Search
        </button>
      </form>

      {/* Autocomplete Dropdown */}
      {showSuggestions && (
        <div className="absolute w-full mt-2 bg-surface border border-slate-700 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl flex flex-col divide-y divide-slate-700/50">
          
          {/* Section 1: Predictive Terms */}
          {suggestions.terms?.length > 0 && (
            <div className="py-2">
              <div className="px-4 py-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">Suggested Searches</div>
              <ul>
                {suggestions.terms.map((term, index) => (
                  <li key={`term-${index}`}>
                    <button
                      onClick={() => handleSuggestionClick(term)}
                      className="w-full text-left px-6 py-2 text-slate-300 hover:bg-primary/20 hover:text-white transition-all flex items-center gap-3"
                    >
                      <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      {term}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Section 2: Categories */}
          {suggestions.categories?.length > 0 && (
            <div className="py-2">
              <div className="px-4 py-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">Categories</div>
              <div className="px-4 py-2 flex flex-wrap gap-2">
                {suggestions.categories.map((cat, index) => (
                  <button
                    key={`cat-${index}`}
                    onClick={() => handleCategoryClick(cat)}
                    className="px-3 py-1 bg-slate-800 text-sm text-slate-300 rounded-full hover:bg-primary hover:text-white transition-colors"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Section 3: Product Hits */}
          {suggestions.products?.length > 0 && (
            <div className="py-2 bg-slate-900/50">
              <div className="px-4 py-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">Products</div>
              <ul>
                {suggestions.products.map((product) => (
                  <li key={`prod-${product.id}`}>
                    <Link
                      to={`/product/${product.id}`}
                      onClick={() => setShowSuggestions(false)}
                      className="w-full text-left px-4 py-2 text-slate-300 hover:bg-primary/20 hover:text-white transition-all flex items-center gap-4"
                    >
                      <div className="w-10 h-10 rounded-md overflow-hidden bg-slate-800 flex-shrink-0">
                        <img src={product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls[0] : ''} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex justify-between items-center">
                        <span className="font-medium text-sm line-clamp-1">{product.name}</span>
                        <span className="text-primary font-bold text-sm ml-4">${product.price.toFixed(2)}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
        </div>
      )}
    </div>
  );
};

export default SearchBar;
