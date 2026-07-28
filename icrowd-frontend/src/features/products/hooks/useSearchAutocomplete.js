import { useState, useEffect, useRef } from 'react';
import { fetchSuggestions } from '../api/fetchSuggestions';
import { useDebounce } from './useDebounce';
import { useNavigate } from 'react-router-dom';

export const useSearchAutocomplete = (initialKeyword, onSearch) => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState(initialKeyword || '');
  const [suggestions, setSuggestions] = useState({ terms: [], categories: [], products: [] });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef(null);

  const debouncedKeyword = useDebounce(keyword, 300);

  // Sync internal state if the URL changes externally
  useEffect(() => {
    setKeyword(initialKeyword || '');
  }, [initialKeyword]);

  // Fetch suggestions when debouncedKeyword changes
  useEffect(() => {
    if (debouncedKeyword.trim().length > 1) {
      fetchSuggestions(debouncedKeyword).then(data => {
        setSuggestions(data);
        const hasResults = data.terms.length > 0 || data.categories.length > 0 || data.products.length > 0;
        setShowSuggestions(hasResults);
      });
    } else {
      setSuggestions({ terms: [], categories: [], products: [] });
      setShowSuggestions(false);
    }
  }, [debouncedKeyword]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    setShowSuggestions(false);
    onSearch(keyword.trim());
  };

  const handleSuggestionClick = (suggestion) => {
    setKeyword(suggestion);
    setShowSuggestions(false);
    onSearch(suggestion);
  };

  const handleCategoryClick = (cat) => {
    setShowSuggestions(false);
    navigate(`/search?category=${encodeURIComponent(cat)}`);
  };

  return {
    keyword,
    setKeyword,
    suggestions,
    showSuggestions,
    setShowSuggestions,
    wrapperRef,
    handleSearch,
    handleSuggestionClick,
    handleCategoryClick
  };
};
