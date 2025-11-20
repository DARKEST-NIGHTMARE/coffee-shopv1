package com.coffeeshop.coffee_shop_backend.controller;

import com.coffeeshop.coffee_shop_backend.dto.InventoryItemDto;
import com.coffeeshop.coffee_shop_backend.dto.StockUpdateRequest;
import com.coffeeshop.coffee_shop_backend.service.InventoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    private final InventoryService inventoryService;

    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    @GetMapping
    public ResponseEntity<List<InventoryItemDto>> getAllInventory() {
        return ResponseEntity.ok(inventoryService.getAllInventoryItems());
    }

    @GetMapping("/low-stock")
    public ResponseEntity<List<InventoryItemDto>> getLowStockItems() {
        return ResponseEntity.ok(inventoryService.getLowStockItems());
    }

    @PostMapping
    public ResponseEntity<InventoryItemDto> createNewItem(@RequestBody InventoryItemDto request) {
        InventoryItemDto newItem = inventoryService.addNewInventoryItem(request);
        return new ResponseEntity<>(newItem, HttpStatus.CREATED);
    }

    @PutMapping("/{inventoryId}/stock")
    public ResponseEntity<InventoryItemDto> updateStock(
            @PathVariable Long inventoryId,
            @RequestBody StockUpdateRequest request
    ) {
        InventoryItemDto updatedItem = inventoryService.updateStock(inventoryId, request);
        return ResponseEntity.ok(updatedItem);
    }
}