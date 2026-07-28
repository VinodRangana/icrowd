package com.icrowd.features.product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.apache.commons.text.similarity.LevenshteinDistance;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

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

    // Advanced Enterprise Rich Search using Levenshtein Distance
    public SuggestionResponse getSearchSuggestions(String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return new SuggestionResponse(List.of(), List.of(), List.of());
        }

        String searchKey = keyword.toLowerCase().trim();
        List<Product> allProducts = productRepository.findAllActiveProductsList();
        LevenshteinDistance distance = new LevenshteinDistance();

        // 1. Find matching terms (from product names)
        List<String> terms = allProducts.stream()
                .map(Product::getName)
                .distinct()
                .filter(name -> {
                    String lowerName = name.toLowerCase();
                    if (lowerName.contains(searchKey)) return true;
                    
                    String[] words = lowerName.split("\\s+");
                    for (String word : words) {
                        int allowedTypos = word.length() <= 4 ? 1 : 2;
                        if (distance.apply(word, searchKey) <= allowedTypos) return true;
                    }
                    return false;
                })
                .sorted((n1, n2) -> {
                    String ln1 = n1.toLowerCase();
                    String ln2 = n2.toLowerCase();
                    if (ln1.contains(searchKey) && !ln2.contains(searchKey)) return -1;
                    if (!ln1.contains(searchKey) && ln2.contains(searchKey)) return 1;
                    return ln1.compareTo(ln2);
                })
                .limit(5)
                .collect(Collectors.toList());

        // 2. Find matching categories
        List<String> categories = allProducts.stream()
                .map(p -> p.getCategory().getName())
                .distinct()
                .filter(cat -> {
                    String lowerCat = cat.toLowerCase();
                    if (lowerCat.contains(searchKey)) return true;
                    String[] words = lowerCat.split("\\s+");
                    for (String word : words) {
                        int allowedTypos = word.length() <= 4 ? 1 : 2;
                        if (distance.apply(word, searchKey) <= allowedTypos) return true;
                    }
                    return false;
                })
                .limit(3)
                .collect(Collectors.toList());

        // 3. Find matching Products directly
        List<Product> products = allProducts.stream()
                .filter(p -> {
                    String lowerName = p.getName().toLowerCase();
                    if (lowerName.contains(searchKey)) return true;
                    String[] words = lowerName.split("\\s+");
                    for (String word : words) {
                        int allowedTypos = word.length() <= 4 ? 1 : 2;
                        if (distance.apply(word, searchKey) <= allowedTypos) return true;
                    }
                    return false;
                })
                .sorted((p1, p2) -> {
                    String ln1 = p1.getName().toLowerCase();
                    String ln2 = p2.getName().toLowerCase();
                    if (ln1.contains(searchKey) && !ln2.contains(searchKey)) return -1;
                    if (!ln1.contains(searchKey) && ln2.contains(searchKey)) return 1;
                    return ln1.compareTo(ln2);
                })
                .limit(3)
                .collect(Collectors.toList());

        return new SuggestionResponse(terms, categories, products);
    }
}
