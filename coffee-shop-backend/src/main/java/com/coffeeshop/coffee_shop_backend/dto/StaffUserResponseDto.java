package com.coffeeshop.coffee_shop_backend.dto;

import com.coffeeshop.coffee_shop_backend.model.StaffUser;

public record StaffUserResponseDto(
        Long id,
        String username,
        String roleName
) {
    public static StaffUserResponseDto fromEntity(StaffUser user) {
        return new StaffUserResponseDto(
                user.getId(),
                user.getUsername(),
                user.getRole().getName()
        );
    }
}