package com.icrowd.features.product;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // Advanced search: GET /api/products?keyword=headset&category=Headset&sort=price_asc&page=0&size=10
    // Notice it returns a Page<Product> instead of List<Product>!
    @GetMapping
    public ResponseEntity<Page<Product>> getProducts(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String sort,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
            
        // If any parameter is provided, use the advanced search
        if (keyword != null || category != null || sort != null) {
            return ResponseEntity.ok(productService.searchAndFilterProducts(keyword, category, sort, page, size));
        }
        
        // Otherwise, return all active products paginated
        return ResponseEntity.ok(productService.getAllActiveProducts(page, size));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(productService.getProductById(id));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/suggestions")
    public ResponseEntity<SuggestionResponse> getSuggestions(@RequestParam String q) {
        return ResponseEntity.ok(productService.getSearchSuggestions(q));
    }
}
