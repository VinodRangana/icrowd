import { apiClient } from '../../../lib/axios';

export const fetchSuggestions = async (keyword) => {
  if (!keyword || keyword.trim() === '') return { terms: [], categories: [], products: [] };
  try {
    const response = await apiClient.get(`/products/suggestions`, {
      params: { q: keyword }
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch suggestions", error);
    return { terms: [], categories: [], products: [] };
  }
};
