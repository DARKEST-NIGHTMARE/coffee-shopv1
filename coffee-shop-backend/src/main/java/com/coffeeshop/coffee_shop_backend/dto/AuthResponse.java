package com.coffeeshop.coffee_shop_backend.dto;
public record AuthResponse(
        String jwtToken,
        String username,
        String role
) {
}