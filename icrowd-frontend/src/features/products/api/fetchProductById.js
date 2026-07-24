import { apiClient } from '../../../lib/axios';

/**
 * Fetches a single product by its ID from the Spring Boot backend.
 */
export const fetchProductById = async (id) => {
  try {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};
