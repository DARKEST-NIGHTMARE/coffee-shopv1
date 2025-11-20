package com.coffeeshop.coffee_shop_backend.controller;

import com.coffeeshop.coffee_shop_backend.dto.OrderCreateRequestDto;
import com.coffeeshop.coffee_shop_backend.dto.OrderResponseDto;
import com.coffeeshop.coffee_shop_backend.dto.OrderStatusUpdateRequestDto;
import com.coffeeshop.coffee_shop_backend.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<OrderResponseDto> createOrder(@RequestBody OrderCreateRequestDto request) {
        OrderResponseDto newOrder = orderService.createOrder(request);
        return new ResponseEntity<>(newOrder, HttpStatus.CREATED);
    }

    @GetMapping("/active")
    public ResponseEntity<List<OrderResponseDto>> getActiveOrders() {
        return ResponseEntity.ok(orderService.getActiveOrders());
    }


    @GetMapping("/history")
    public ResponseEntity<List<OrderResponseDto>> getOrderHistory() {
        return ResponseEntity.ok(orderService.getOrderHistory());
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderResponseDto> getOrderById(@PathVariable Long orderId) {
        return ResponseEntity.ok(orderService.getOrderById(orderId));
    }

    @PutMapping("/{orderId}/status")
    public ResponseEntity<OrderResponseDto> updateOrderStatus(
            @PathVariable Long orderId,
            @RequestBody OrderStatusUpdateRequestDto request
    ) {
        return ResponseEntity.ok(orderService.updateOrderStatus(orderId, request));
    }
}
