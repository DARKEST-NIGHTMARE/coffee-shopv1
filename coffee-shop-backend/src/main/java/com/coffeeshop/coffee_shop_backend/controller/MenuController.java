package com.coffeeshop.coffee_shop_backend.controller;

import com.coffeeshop.coffee_shop_backend.dto.MenuItemRequestDto;
import com.coffeeshop.coffee_shop_backend.dto.MenuItemResponseDto;
import com.coffeeshop.coffee_shop_backend.service.MenuService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menu")
public class MenuController {

    private final MenuService menuService;

    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    @GetMapping
    public ResponseEntity<List<MenuItemResponseDto>> getAllMenuItems() {
        return ResponseEntity.ok(menuService.getAllMenuItems());
    }

    @PostMapping
    public ResponseEntity<MenuItemResponseDto> createMenuItem(@RequestBody MenuItemRequestDto request) {
        MenuItemResponseDto newItem = menuService.addMenuItem(request);
        return new ResponseEntity<>(newItem, HttpStatus.CREATED);
    }

    @PutMapping("/{menuId}")
    public ResponseEntity<MenuItemResponseDto> updateMenuItem(
            @PathVariable Long menuId,
            @RequestBody MenuItemRequestDto request
    ) {
        MenuItemResponseDto updatedItem = menuService.updateMenuItem(menuId, request);
        return ResponseEntity.ok(updatedItem);
    }

    @DeleteMapping("/{menuId}")
    public ResponseEntity<Void> deleteMenuItem(@PathVariable Long menuId) {
        menuService.deleteMenuItem(menuId);
        return ResponseEntity.noContent().build();
    }
}