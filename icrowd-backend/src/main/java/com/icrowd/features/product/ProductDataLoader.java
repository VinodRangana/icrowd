package com.icrowd.features.product;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Configuration
public class ProductDataLoader {

    @Bean
    CommandLineRunner loadProductData(ProductRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                List<Product> products = new ArrayList<>();
                
                String[] categories = {"Headset", "PowerBank", "Case"};
                String[] images = {
                    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", // Headset
                    "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&q=80", // PowerBank
                    "https://images.unsplash.com/photo-1603313011101-320f26a4f6f6?w=500&q=80"  // Case
                };

                for (int i = 1; i <= 25; i++) {
                    int categoryIndex = i % 3;
                    String category = categories[categoryIndex];
                    
                    Product p = new Product();
                    p.setSku(String.format("SKU-%03d", i));
                    p.setName("iCrowd Pro " + category + " Model " + i);
                    p.setDescription("Premium high-quality " + category + " for everyday use.");
                    p.setCategory(category);
                    
                    // Varying price based on index
                    double basePrice = categoryIndex == 0 ? 149.99 : categoryIndex == 1 ? 49.99 : 24.99;
                    p.setPrice(BigDecimal.valueOf(basePrice + (i * 2.5)));
                    
                    // Varying stock, some might be 0 to test Out Of Stock UI
                    p.setAvailableStock(i == 5 || i == 12 ? 0 : 50 + i); 
                    
                    p.setImageUrl(images[categoryIndex]);
                    
                    products.add(p);
                }

                repository.saveAll(products);
                System.out.println("25 Sample products loaded into the database.");
            }
        };
    }
}
