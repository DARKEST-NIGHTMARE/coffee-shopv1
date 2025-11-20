package com.coffeeshop.coffee_shop_backend.dto;

import com.coffeeshop.coffee_shop_backend.model.OrderItem;

import java.math.BigDecimal;

public record OrderItemResponseDto(
        Long id,
        Long menuItemId,
        String menuItemName,
        int quantity,
        BigDecimal priceAtOrderTime
) {
    public static OrderItemResponseDto fromEntity(OrderItem item) {
        return new OrderItemResponseDto(
                item.getId(),
                item.getMenuItem().getId(),
                item.getMenuItem().getName(),
                item.getQuantity(),
                item.getPriceAtOrderTime()
        );
    }
}
