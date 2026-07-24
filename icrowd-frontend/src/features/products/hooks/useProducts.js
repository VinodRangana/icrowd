import { useState, useEffect } from 'react';
import { fetchProducts } from '../api/fetchProducts';

/**
 * Custom hook to encapsulate paginated product fetching and state management.
 */
export const useProducts = (keyword = '', category = '', sort = '', page = 0, size = 10) => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    totalPages: 0,
    totalElements: 0,
    number: 0,
    size: 10
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts(keyword, category, sort, page, size);
        
        // Spring Data JPA returns the array in "content"
        setProducts(data.content || []);
        
        // Save the metadata for our pagination UI
        setPagination({
          totalPages: data.totalPages || 0,
          totalElements: data.totalElements || 0,
          number: data.number || 0,
          size: data.size || 10
        });
        
        setError(null);
      } catch (err) {
        setError('Failed to load products. Make sure the backend is running!');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [keyword, category, sort, page, size]);

  return { products, pagination, loading, error };
};
