package com.coffeeshop.coffee_shop_backend.dto;

public record RegisterRequest(
        String username,
        String password,
        Long roleId
) {
}