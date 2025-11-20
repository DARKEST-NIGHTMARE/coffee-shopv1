package com.coffeeshop.coffee_shop_backend.service;

import com.coffeeshop.coffee_shop_backend.dto.MenuItemRequestDto;
import com.coffeeshop.coffee_shop_backend.dto.MenuItemResponseDto;
import com.coffeeshop.coffee_shop_backend.dto.RecipeComponentDto;
import com.coffeeshop.coffee_shop_backend.model.InventoryItem;
import com.coffeeshop.coffee_shop_backend.model.MenuItem;
import com.coffeeshop.coffee_shop_backend.model.RecipeComponent;
import com.coffeeshop.coffee_shop_backend.repository.InventoryItemRepository;
import com.coffeeshop.coffee_shop_backend.repository.MenuItemRepository;
import com.coffeeshop.coffee_shop_backend.repository.RecipeComponentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class MenuService {

    private final MenuItemRepository menuItemRepository;
    private final InventoryItemRepository inventoryItemRepository;
    private final RecipeComponentRepository recipeComponentRepository;

    public MenuService(MenuItemRepository menuItemRepository,
                       InventoryItemRepository inventoryItemRepository,
                       RecipeComponentRepository recipeComponentRepository) {
        this.menuItemRepository = menuItemRepository;
        this.inventoryItemRepository = inventoryItemRepository;
        this.recipeComponentRepository = recipeComponentRepository;
    }

    public List<MenuItemResponseDto> getAllMenuItems() {
        return menuItemRepository.findAll().stream()
                .map(MenuItemResponseDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    public MenuItemResponseDto addMenuItem(MenuItemRequestDto request) {
        MenuItem menuItem = new MenuItem();
        menuItem.setName(request.name());
        menuItem.setDescription(request.description());
        menuItem.setPrice(request.price());
        menuItem.setCategory(request.category());
        menuItem.setAvailable(request.isAvailable());
        menuItem.setImageUrl(request.imageUrl());
        MenuItem savedMenuItem = menuItemRepository.save(menuItem);

        Set<RecipeComponent> recipe = new HashSet<>();
        for (RecipeComponentDto dto : request.recipe()) {
            InventoryItem item = inventoryItemRepository.findById(dto.inventoryItemId())
                    .orElseThrow(() -> new RuntimeException("Inventory item not found: " + dto.inventoryItemId()));

            RecipeComponent component = new RecipeComponent();
            component.setMenuItem(savedMenuItem);
            component.setInventoryItem(item);
            component.setQuantityConsumed(dto.quantityConsumed());

            recipe.add(recipeComponentRepository.save(component));
        }

        savedMenuItem.setRecipeComponents(recipe);
        return MenuItemResponseDto.fromEntity(savedMenuItem);
    }

    @Transactional
    public MenuItemResponseDto updateMenuItem(Long menuId, MenuItemRequestDto request) {
        MenuItem menuItem = menuItemRepository.findById(menuId)
                .orElseThrow(() -> new RuntimeException("Menu item not found: " + menuId));
        menuItem.setName(request.name());
        menuItem.setDescription(request.description());
        menuItem.setPrice(request.price());
        menuItem.setCategory(request.category());
        menuItem.setAvailable(request.isAvailable());
        menuItem.setImageUrl(request.imageUrl());

        recipeComponentRepository.deleteAll(menuItem.getRecipeComponents());
        menuItem.getRecipeComponents().clear();

        Set<RecipeComponent> newRecipe = new HashSet<>();
        for (RecipeComponentDto dto : request.recipe()) {
            InventoryItem item = inventoryItemRepository.findById(dto.inventoryItemId())
                    .orElseThrow(() -> new RuntimeException("Inventory item not found: " + dto.inventoryItemId()));

            RecipeComponent component = new RecipeComponent();
            component.setMenuItem(menuItem);
            component.setInventoryItem(item);
            component.setQuantityConsumed(dto.quantityConsumed());

            newRecipe.add(recipeComponentRepository.save(component));
        }

        menuItem.setRecipeComponents(newRecipe);
        MenuItem updatedMenuItem = menuItemRepository.save(menuItem);

        return MenuItemResponseDto.fromEntity(updatedMenuItem);
    }

    @Transactional
    public void deleteMenuItem(Long menuId) {
        if (!menuItemRepository.existsById(menuId)) {
            throw new RuntimeException("Menu item not found:" + menuId);
        }
        menuItemRepository.deleteById(menuId);
    }
}