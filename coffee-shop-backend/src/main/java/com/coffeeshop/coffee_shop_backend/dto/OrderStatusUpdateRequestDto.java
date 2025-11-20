package com.coffeeshop.coffee_shop_backend.dto;

import com.coffeeshop.coffee_shop_backend.model.OrderStatus;

public record OrderStatusUpdateRequestDto(OrderStatus status) {
}
