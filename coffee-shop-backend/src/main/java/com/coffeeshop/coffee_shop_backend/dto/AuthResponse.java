package com.coffeeshop.coffee_shop_backend.dto;

import java.util.Set;

public record AuthResponse(
        String jwtToken,
        String username,
        String roleName,
        Set<String> permissions
) {
}