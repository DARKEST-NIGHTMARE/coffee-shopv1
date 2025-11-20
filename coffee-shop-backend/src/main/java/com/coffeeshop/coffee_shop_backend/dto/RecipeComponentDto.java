package com.coffeeshop.coffee_shop_backend.dto;

public record RecipeComponentDto(
        Long inventoryItemId,
        double quantityConsumed
) {
}