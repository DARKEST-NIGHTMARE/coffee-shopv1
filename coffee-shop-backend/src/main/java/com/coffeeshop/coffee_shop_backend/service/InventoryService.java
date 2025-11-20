package com.coffeeshop.coffee_shop_backend.service;

import com.coffeeshop.coffee_shop_backend.dto.InventoryItemDto;
import com.coffeeshop.coffee_shop_backend.dto.StockUpdateRequest;
import com.coffeeshop.coffee_shop_backend.model.*;
import com.coffeeshop.coffee_shop_backend.repository.InventoryItemRepository;
import com.coffeeshop.coffee_shop_backend.repository.RecipeComponentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InventoryService {

    private final InventoryItemRepository inventoryItemRepository;
    private final RecipeComponentRepository recipeComponentRepository;

//    public InventoryService(InventoryItemRepository inventoryItemRepository) {
//        this.inventoryItemRepository = inventoryItemRepository;
//    }

    public InventoryService(InventoryItemRepository inventoryItemRepository,
                            RecipeComponentRepository recipeComponentRepository) {
        this.inventoryItemRepository = inventoryItemRepository;
        this.recipeComponentRepository = recipeComponentRepository;
    }


    public List<InventoryItemDto> getAllInventoryItems() {
        return inventoryItemRepository.findAll().stream()
                .map(InventoryItemDto::fromEntity)
                .collect(Collectors.toList());
    }

    public List<InventoryItemDto> getLowStockItems() {
        return inventoryItemRepository.findLowStockItems().stream()
                .map(InventoryItemDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    public InventoryItemDto addNewInventoryItem(InventoryItemDto request) {
        InventoryItem newItem = new InventoryItem();
        newItem.setName(request.name());
        newItem.setUnitOfMeasure(request.unitOfMeasure());
        newItem.setReorderLevel(request.reorderLevel());
        newItem.setCurrentStock(0.0);

        InventoryItem savedItem = inventoryItemRepository.save(newItem);
        return InventoryItemDto.fromEntity(savedItem);
    }

    @Transactional
    public InventoryItemDto updateStock(Long itemId, StockUpdateRequest request) {
        InventoryItem item = inventoryItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Inventory item not found with id: " + itemId));

        double newStock = item.getCurrentStock() + request.changeQuantity();
        item.setCurrentStock(newStock);

        InventoryItem updatedItem = inventoryItemRepository.save(item);
        return InventoryItemDto.fromEntity(updatedItem);
    }


    @Transactional
    public void deductStockForOrder(ShopOrder order) {
        for (OrderItem orderItem : order.getOrderItems()) {
            MenuItem menuItem = orderItem.getMenuItem();
            int orderQuantity = orderItem.getQuantity();

            for (RecipeComponent component : menuItem.getRecipeComponents()) {
                InventoryItem inventoryItem = component.getInventoryItem();
                double quantityToDeduct = component.getQuantityConsumed() * orderQuantity;

                InventoryItem itemToUpdate = inventoryItemRepository.findById(inventoryItem.getId())
                        .orElseThrow(() -> new RuntimeException("Inventory item not found: " + inventoryItem.getName()));

                double newStock = itemToUpdate.getCurrentStock() - quantityToDeduct;
                itemToUpdate.setCurrentStock(newStock);
                inventoryItemRepository.save(itemToUpdate);
            }
        }

    }
}