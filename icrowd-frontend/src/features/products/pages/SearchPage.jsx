import React, { useState, useEffect } from 'react';
import ProductGrid from '../components/ProductGrid';
import FilterSidebar from '../components/FilterSidebar';
import AutoCorrectBanner from '../components/AutoCorrectBanner';
import { useProducts } from '../hooks/useProducts';
import { useProductFilters } from '../hooks/useProductFilters';
import { fetchSuggestions } from '../api/fetchSuggestions';

const SearchPage = () => {
  const { keyword, category, sort, page, setCategory, setSort, setPage } = useProductFilters();
  
  // State for auto-correction
  const [activeKeyword, setActiveKeyword] = useState(keyword);
  const [originalTypo, setOriginalTypo] = useState(null);
  const [strictSearch, setStrictSearch] = useState(false);

  // Sync active keyword when URL keyword changes
  useEffect(() => {
    setActiveKeyword(keyword);
    setOriginalTypo(null);
    setStrictSearch(false);
  }, [keyword]);

  const pageSize = 8;
  const { products, pagination, loading, error } = useProducts(activeKeyword, category, sort, page, pageSize);

  // Auto-correction Effect
  useEffect(() => {
    if (!loading && !strictSearch && keyword && pagination && pagination.totalElements === 0) {
      // 0 results! Let's check for a typo
      fetchSuggestions(keyword).then(data => {
        if (data.terms && data.terms.length > 0) {
          const bestMatch = data.terms[0];
          if (bestMatch.toLowerCase() !== keyword.toLowerCase()) {
            setOriginalTypo(keyword);
            setActiveKeyword(bestMatch);
            // Notice we do NOT change the URL, just the active search keyword
          }
        }
      });
    }
  }, [loading, strictSearch, keyword, pagination]);

  const handleSearchOriginal = (typo) => {
    setStrictSearch(true);
    setActiveKeyword(typo);
    setOriginalTypo(null);
  };

  let title = "All Products";
  if (activeKeyword) title = `Search Results for "${activeKeyword}"`;
  else if (category) title = `${category} Accessories`;

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar */}
        <div className="w-full lg:w-1/4">
          <FilterSidebar 
            currentCategory={category} 
            currentSort={sort} 
            onCategoryChange={setCategory}
            onSortChange={setSort}
          />
        </div>

        {/* Main Content */}
        <div className="w-full lg:w-3/4">
          
          {originalTypo && (
            <AutoCorrectBanner 
              originalTerm={originalTypo}
              correctedTerm={activeKeyword}
              onSearchOriginal={handleSearchOriginal}
            />
          )}

          <ProductGrid 
            products={products}
            pagination={pagination}
            onPageChange={handlePageChange}
            loading={loading}
            error={error}
            title={title}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
