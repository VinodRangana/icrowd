package com.icrowd.features.product;

import com.icrowd.features.category.Category;
import com.icrowd.features.category.CategoryRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Configuration
public class ProductDataLoader {

    @Bean
    CommandLineRunner loadProductData(ProductRepository productRepository, CategoryRepository categoryRepository) {
        return args -> {
            if (productRepository.count() == 0) {
                // 1. Create Categories
                Category headsetCat = categoryRepository.save(Category.builder().name("Headset").description("Audio devices").build());
                Category powerBankCat = categoryRepository.save(Category.builder().name("PowerBank").description("Portable chargers").build());
                Category caseCat = categoryRepository.save(Category.builder().name("Case").description("Protective phone cases").build());

                Category[] categories = {headsetCat, powerBankCat, caseCat};
                
                String[] images = {
                    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", // Headset
                    "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&q=80", // PowerBank
                    "https://images.unsplash.com/photo-1603313011101-320f26a4f6f6?w=500&q=80"  // Case
                };

                List<Product> products = new ArrayList<>();

                // 2. Create Products using Lombok Builder
                for (int i = 1; i <= 25; i++) {
                    int categoryIndex = i % 3;
                    Category category = categories[categoryIndex];
                    
                    double basePrice = categoryIndex == 0 ? 149.99 : categoryIndex == 1 ? 49.99 : 24.99;
                    BigDecimal price = BigDecimal.valueOf(basePrice + (i * 2.5));
                    
                    int stock = (i == 5 || i == 12) ? 0 : 50 + i;

                    Product p = Product.builder()
                        .sku(String.format("SKU-%03d", i))
                        .name("iCrowd Pro " + category.getName() + " Model " + i)
                        .description("Premium high-quality " + category.getName() + " for everyday use.")
                        .category(category)
                        .price(price)
                        .availableStock(stock)
                        .imageUrls(List.of(images[categoryIndex], "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80"))
                        .tags(List.of("premium", "new", category.getName().toLowerCase()))
                        .build();
                    
                    products.add(p);
                }

                productRepository.saveAll(products);
                System.out.println("25 Sample products loaded into the database.");
            }
        };
    }
}
