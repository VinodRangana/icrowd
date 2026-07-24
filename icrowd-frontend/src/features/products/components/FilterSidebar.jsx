import React from 'react';

const FilterSidebar = ({ currentCategory, currentSort, onCategoryChange, onSortChange }) => {
  const categories = ['All', 'Headset', 'PowerBank', 'Case'];
  
  return (
    <div className="bg-surface/50 backdrop-blur-md border border-slate-700/50 p-6 rounded-2xl h-fit sticky top-24">
      <h3 className="text-xl font-bold text-white mb-6">Filters</h3>
      
      {/* Categories */}
      <div className="mb-8">
        <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
          Category
        </h4>
        <div className="space-y-2 flex flex-col">
          {categories.map((cat) => {
            const isSelected = (currentCategory === cat) || (!currentCategory && cat === 'All');
            return (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`text-left px-4 py-2 rounded-xl transition-all ${
                  isSelected 
                  ? 'bg-primary/20 text-primary font-medium border border-primary/30' 
                  : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sorting */}
      <div>
        <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
          Sort By
        </h4>
        <select 
          className="w-full bg-slate-900 border border-slate-700 text-white text-sm rounded-xl focus:ring-primary focus:border-primary block p-3 outline-none"
          value={currentSort || ''}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="">Featured</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSidebar;
