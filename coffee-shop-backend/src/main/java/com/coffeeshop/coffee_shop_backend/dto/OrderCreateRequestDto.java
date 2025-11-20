package com.coffeeshop.coffee_shop_backend.dto;

import java.util.List;

public record OrderCreateRequestDto(
        String tableName,
        List<OrderItemRequestDto> items
) {
}
