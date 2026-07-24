package com.icrowd.features.product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    
    // Returns a paginated slice of active products
    Page<Product> findByIsActiveTrue(Pageable pageable);
    
    // Fetch a single active product for the Product Details Page
    Optional<Product> findByIdAndIsActiveTrue(Long id);

    // Advanced dynamic query for Searching and Filtering with Pagination!
    @Query("SELECT p FROM Product p WHERE p.isActive = true " +
           "AND (:keyword IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
           "AND (:category IS NULL OR p.category = :category)")
    Page<Product> searchAndFilterProducts(
            @Param("keyword") String keyword, 
            @Param("category") String category, 
            Pageable pageable
    );
}
