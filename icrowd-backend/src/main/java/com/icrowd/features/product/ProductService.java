package com.icrowd.features.product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class ProductService {
    
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Page<Product> getAllActiveProducts(int page, int size) {
        return productRepository.findByIsActiveTrue(PageRequest.of(page, size));
    }

    // Advanced search with pagination and database-level sorting!
    public Page<Product> searchAndFilterProducts(String keyword, String category, String sortParam, int page, int size) {
        
        // 1. Configure Sorting
        Sort sort = Sort.unsorted();
        if (sortParam != null) {
            switch (sortParam.toLowerCase()) {
                case "price_asc":
                    sort = Sort.by(Sort.Direction.ASC, "price");
                    break;
                case "price_desc":
                    sort = Sort.by(Sort.Direction.DESC, "price");
                    break;
            }
        }

        // 2. Create Pageable Request
        Pageable pageable = PageRequest.of(page, size, sort);

        // 3. Fetch Paginated data from Database
        return productRepository.searchAndFilterProducts(
            (keyword != null && keyword.isBlank()) ? null : keyword, 
            (category != null && category.isBlank()) ? null : category,
            pageable
        );
    }
    
    public Product getProductById(Long id) {
        return productRepository.findByIdAndIsActiveTrue(id)
            .orElseThrow(() -> new RuntimeException("Product not found or inactive"));
    }
}
