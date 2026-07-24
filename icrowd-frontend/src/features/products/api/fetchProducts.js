import { apiClient } from '../../../lib/axios';

/**
 * Fetches products from the Spring Boot backend with optional filters and pagination.
 */
export const fetchProducts = async (keyword = '', category = '', sort = '', page = 0, size = 10) => {
  try {
    const params = new URLSearchParams();
    if (keyword) params.append('keyword', keyword);
    if (category) params.append('category', category);
    if (sort) params.append('sort', sort);
    params.append('page', page);
    params.append('size', size);
    
    const queryString = params.toString();
    const url = `/products?${queryString}`;
    
    const response = await apiClient.get(url);
    // Spring Boot Page<Product> object contains:
    // .content (the array of items), .totalElements, .totalPages, .number (current page)
    return response.data; 
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
