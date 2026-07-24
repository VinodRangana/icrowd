import React, { useState, useEffect } from 'react';

const SearchBar = ({ initialKeyword, onSearch, placeholder = "Search headsets, powerbanks, cases..." }) => {
  const [keyword, setKeyword] = useState(initialKeyword || '');

  // Sync internal state if the URL changes externally (e.g., clicking back button)
  useEffect(() => {
    setKeyword(initialKeyword || '');
  }, [initialKeyword]);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(keyword.trim());
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-2xl mx-auto">
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
        <svg className="w-5 h-5 text-slate-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
      </div>
      <input 
        type="search" 
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="block w-full p-4 pl-12 text-sm text-white bg-surface/80 backdrop-blur-md border border-slate-700 rounded-2xl focus:ring-primary focus:border-primary outline-none shadow-lg" 
        placeholder={placeholder} 
      />
      <button 
        type="submit" 
        className="text-white absolute right-2.5 bottom-2.5 bg-primary hover:bg-primary/90 focus:ring-4 focus:outline-none focus:ring-primary/50 font-medium rounded-xl text-sm px-6 py-2 transition-colors"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
