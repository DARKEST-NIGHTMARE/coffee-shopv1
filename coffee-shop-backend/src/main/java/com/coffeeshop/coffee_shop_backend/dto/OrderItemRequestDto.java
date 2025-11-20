package com.coffeeshop.coffee_shop_backend.dto;

public record OrderItemRequestDto(
        Long menuItemId,
        int quantity
) {
}
