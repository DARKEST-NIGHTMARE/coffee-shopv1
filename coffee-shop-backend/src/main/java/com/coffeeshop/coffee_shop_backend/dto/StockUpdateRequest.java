package com.coffeeshop.coffee_shop_backend.dto;

public record StockUpdateRequest(
        double changeQuantity // like 100.0 (for a new delivery) or -50.0 (for wastage)
) {
}