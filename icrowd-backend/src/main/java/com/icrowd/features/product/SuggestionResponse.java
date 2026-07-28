package com.icrowd.features.product;

import java.util.List;

public class SuggestionResponse {
    private List<String> terms;
    private List<String> categories;
    private List<Product> products;

    public SuggestionResponse(List<String> terms, List<String> categories, List<Product> products) {
        this.terms = terms;
        this.categories = categories;
        this.products = products;
    }

    public List<String> getTerms() {
        return terms;
    }

    public void setTerms(List<String> terms) {
        this.terms = terms;
    }

    public List<String> getCategories() {
        return categories;
    }

    public void setCategories(List<String> categories) {
        this.categories = categories;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }
}
