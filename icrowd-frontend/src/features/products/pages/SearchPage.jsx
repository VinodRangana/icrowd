import React from 'react';
import ProductGrid from '../components/ProductGrid';
import FilterSidebar from '../components/FilterSidebar';
import { useProducts } from '../hooks/useProducts';
import { useProductFilters } from '../hooks/useProductFilters';

const SearchPage = () => {
  // 1. Get current URL state and updater functions from our new hook
  const { keyword, category, sort, page, setCategory, setSort, setPage } = useProductFilters();
  
  // 2. Fetch products using the current URL state
  const pageSize = 8;
  const { products, pagination, loading, error } = useProducts(keyword, category, sort, page, pageSize);

  // 3. Determine dynamic title
  let title = "All Products";
  if (keyword) title = `Search Results for "${keyword}"`;
  else if (category) title = `${category} Accessories`;

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar (Dumb Component receiving state & callbacks) */}
        <div className="w-full lg:w-1/4">
          <FilterSidebar 
            currentCategory={category} 
            currentSort={sort} 
            onCategoryChange={setCategory}
            onSortChange={setSort}
          />
        </div>

        {/* Main Content (Dumb Component receiving state & callbacks) */}
        <div className="w-full lg:w-3/4">
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
