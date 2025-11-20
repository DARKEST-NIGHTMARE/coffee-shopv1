package com.coffeeshop.coffee_shop_backend.service;

import com.coffeeshop.coffee_shop_backend.dto.OrderCreateRequestDto;
import com.coffeeshop.coffee_shop_backend.dto.OrderItemRequestDto;
import com.coffeeshop.coffee_shop_backend.dto.OrderResponseDto;
import com.coffeeshop.coffee_shop_backend.dto.OrderStatusUpdateRequestDto;
import com.coffeeshop.coffee_shop_backend.model.*;
import com.coffeeshop.coffee_shop_backend.repository.MenuItemRepository;
import com.coffeeshop.coffee_shop_backend.repository.OrderItemRepository;
import com.coffeeshop.coffee_shop_backend.repository.ShopOrderRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final ShopOrderRepository shopOrderRepository;
    private final OrderItemRepository orderItemRepository;
    private final MenuItemRepository menuItemRepository;
    private final InventoryService inventoryService;

    public OrderService(ShopOrderRepository shopOrderRepository,
                        OrderItemRepository orderItemRepository,
                        MenuItemRepository menuItemRepository,
                        InventoryService inventoryService) {
        this.shopOrderRepository = shopOrderRepository;
        this.orderItemRepository = orderItemRepository;
        this.menuItemRepository = menuItemRepository;
        this.inventoryService = inventoryService;
    }

    @Transactional
    public OrderResponseDto createOrder(OrderCreateRequestDto request) {
        StaffUser currentUser = (StaffUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        ShopOrder order = new ShopOrder();
        order.setTableName(request.tableName());
        order.setCreatedBy(currentUser);
        order.setStatus(OrderStatus.PENDING);
        order.setOrderTimestamp(LocalDateTime.now());

        Set<OrderItem> orderItems = new HashSet<>();
        BigDecimal totalOrderPrice = BigDecimal.ZERO;

        for (OrderItemRequestDto itemDto : request.items()) {
            MenuItem menuItem = menuItemRepository.findById(itemDto.menuItemId())
                    .orElseThrow(() -> new RuntimeException("Menu item not found: " + itemDto.menuItemId()));

            if (!menuItem.isAvailable()) {
                throw new RuntimeException("Menu item is not available: " + menuItem.getName());
            }

            OrderItem orderItem = new OrderItem();
            orderItem.setShopOrder(order);
            orderItem.setMenuItem(menuItem);
            orderItem.setQuantity(itemDto.quantity());
            orderItem.setPriceAtOrderTime(menuItem.getPrice());

            orderItems.add(orderItem);

            BigDecimal itemTotalPrice = menuItem.getPrice().multiply(BigDecimal.valueOf(itemDto.quantity()));
            totalOrderPrice = totalOrderPrice.add(itemTotalPrice);
        }

        order.setOrderItems(orderItems);
        order.setTotalPrice(totalOrderPrice);

        ShopOrder savedOrder = shopOrderRepository.save(order);

        return OrderResponseDto.fromEntity(savedOrder);
    }

    @Transactional
    public OrderResponseDto updateOrderStatus(Long orderId, OrderStatusUpdateRequestDto request) {
        ShopOrder order = shopOrderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found: " + orderId));

        order.setStatus(request.status());

        if (request.status() == OrderStatus.COMPLETED) {
            order.setCompletedTimestamp(LocalDateTime.now());
            inventoryService.deductStockForOrder(order);
        }

        ShopOrder updatedOrder = shopOrderRepository.save(order);
        return OrderResponseDto.fromEntity(updatedOrder);
    }

    public OrderResponseDto getOrderById(Long orderId) {
        ShopOrder order = shopOrderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found: " + orderId));
        return OrderResponseDto.fromEntity(order);
    }

    public List<OrderResponseDto> getActiveOrders() {
        List<OrderStatus> activeStatuses = List.of(OrderStatus.PENDING, OrderStatus.IN_PROGRESS, OrderStatus.PREPARED);
        return shopOrderRepository.findAllByStatusInOrderByOrderTimestampAsc(activeStatuses)
                .stream()
                .map(OrderResponseDto::fromEntity)
                .collect(Collectors.toList());
    }

    public List<OrderResponseDto> getOrderHistory() {
        List<OrderStatus> historyStatuses = List.of(OrderStatus.COMPLETED, OrderStatus.CANCELLED);
        return shopOrderRepository.findAllByStatusInOrderByOrderTimestampDesc(historyStatuses)
                .stream()
                .map(OrderResponseDto::fromEntity)
                .collect(Collectors.toList());
    }
}
