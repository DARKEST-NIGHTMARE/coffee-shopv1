package com.coffeeshop.coffee_shop_backend.dto;

import com.coffeeshop.coffee_shop_backend.model.MenuItem;
import com.coffeeshop.coffee_shop_backend.model.RecipeComponent;

import java.math.BigDecimal;
import java.util.Set;
import java.util.stream.Collectors;

public record MenuItemResponseDto(
        Long id,
        String name,
        String description,
        BigDecimal price,
        String category,
        boolean isAvailable,
        String imageUrl,
        Set<RecipeComponentResponseDto> recipeComponents
) {
    public record RecipeComponentResponseDto(
            Long id,
            Long inventoryItemId,
            String inventoryItemName,
            double quantityConsumed
    ) {
        public static RecipeComponentResponseDto fromEntity(RecipeComponent rc) {
            return new RecipeComponentResponseDto(
                    rc.getId(),
                    rc.getInventoryItem().getId(),
                    rc.getInventoryItem().getName(),
                    rc.getQuantityConsumed()
            );
        }
    }
    public static MenuItemResponseDto fromEntity(MenuItem menuItem) {
        return new MenuItemResponseDto(
                menuItem.getId(),
                menuItem.getName(),
                menuItem.getDescription(),
                menuItem.getPrice(),
                menuItem.getCategory(),
                menuItem.isAvailable(),
                menuItem.getImageUrl(),
                menuItem.getRecipeComponents().stream()
                        .map(RecipeComponentResponseDto::fromEntity)
                        .collect(Collectors.toSet())
        );
    }
}