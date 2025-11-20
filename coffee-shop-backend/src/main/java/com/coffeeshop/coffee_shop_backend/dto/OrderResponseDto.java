package com.coffeeshop.coffee_shop_backend.dto;
import com.coffeeshop.coffee_shop_backend.model.OrderItem;
import com.coffeeshop.coffee_shop_backend.model.OrderStatus;
import com.coffeeshop.coffee_shop_backend.model.ShopOrder;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.stream.Collectors;

public record OrderResponseDto(
        Long id,
        String tableName,
        OrderStatus status,
        BigDecimal totalPrice,
        LocalDateTime orderTimestamp,
        LocalDateTime completedTimestamp,
        String createdByUsername,
        Set<OrderItemResponseDto> orderItems
) {
    public static OrderResponseDto fromEntity(ShopOrder order) {
        return new OrderResponseDto(
                order.getId(),
                order.getTableName(),
                order.getStatus(),
                order.getTotalPrice(),
                order.getOrderTimestamp(),
                order.getCompletedTimestamp(),
                order.getCreatedBy() != null ? order.getCreatedBy().getUsername() : "N/A",
                order.getOrderItems().stream()
                        .map(OrderItemResponseDto::fromEntity)
                        .collect(Collectors.toSet())
        );
    }
}
