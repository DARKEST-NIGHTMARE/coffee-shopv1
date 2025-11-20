package com.coffeeshop.coffee_shop_backend.repository;

import com.coffeeshop.coffee_shop_backend.dto.SalesByCategoryDto;
import com.coffeeshop.coffee_shop_backend.dto.TopSellingItemDto;
import com.coffeeshop.coffee_shop_backend.model.OrderItem;
import com.coffeeshop.coffee_shop_backend.model.OrderStatus;
import org.springframework.cglib.core.Local;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {


    @Query("SELECT oi.menuItem.name AS menuItemName, SUM(oi.quantity) AS quantitySold " +
            "FROM OrderItem oi " +
            "JOIN oi.shopOrder so " +
            "WHERE so.status = :status AND so.completedTimestamp BETWEEN :startDate AND :endDate " +
            "GROUP BY oi.menuItem.name " +
            "ORDER BY quantitySold DESC")
    List<TopSellingItemDto> findTopSellingItems(
            @Param("status") OrderStatus status,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate
    );

    @Query("SELECT mi.category AS category, SUM(oi.priceAtOrderTime * oi.quantity) AS totalSales " +
            "FROM OrderItem oi " +
            "JOIN oi.menuItem mi " +
            "JOIN oi.shopOrder so " +
            "WHERE so.status = :status AND so.completedTimestamp BETWEEN :startDate AND :endDate " +
            "GROUP BY mi.category")
    List<SalesByCategoryDto> findSalesByCategory(
            @Param("status") OrderStatus status,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate
    );

}