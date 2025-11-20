package com.coffeeshop.coffee_shop_backend.dto;

import java.math.BigDecimal;
import java.util.Set;

public record MenuItemRequestDto(
        String name,
        String description,
        BigDecimal price,
        String category,
        boolean isAvailable,
        String imageUrl,
        Set<RecipeComponentDto> recipe
) {
}