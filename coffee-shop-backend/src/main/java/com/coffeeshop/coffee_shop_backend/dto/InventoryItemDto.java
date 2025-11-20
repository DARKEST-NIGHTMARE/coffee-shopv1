package com.coffeeshop.coffee_shop_backend.dto;

import com.coffeeshop.coffee_shop_backend.model.InventoryItem;
import com.coffeeshop.coffee_shop_backend.model.UnitOfMeasure;

public record InventoryItemDto(
        Long id,
        String name,
        UnitOfMeasure unitOfMeasure,
        double currentStock,
        double reorderLevel
) {
    public static InventoryItemDto fromEntity(InventoryItem item) {
        return new InventoryItemDto(
                item.getId(),
                item.getName(),
                item.getUnitOfMeasure(),
                item.getCurrentStock(),
                item.getReorderLevel()
        );
    }
}