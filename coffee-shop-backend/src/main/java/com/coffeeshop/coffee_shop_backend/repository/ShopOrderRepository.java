package com.coffeeshop.coffee_shop_backend.repository;

import com.coffeeshop.coffee_shop_backend.model.OrderStatus;
import com.coffeeshop.coffee_shop_backend.model.ShopOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Repository
public interface ShopOrderRepository extends JpaRepository<ShopOrder, Long> {
    List<ShopOrder> findAllByStatusInOrderByOrderTimestampAsc(List<OrderStatus> statuses);


    List<ShopOrder> findAllByStatusInOrderByOrderTimestampDesc(List<OrderStatus> statuses);

    @Query("SELECT COALESCE(SUM(s.totalPrice),0) FROM ShopOrder s " +
            "WHERE s.status = :status AND s.completedTimestamp BETWEEN :startDate AND :endDate")
    BigDecimal findTotalRevenueByStatusAndDateRange(
            @Param("status") OrderStatus status,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate
    );


    Long countByStatusAndCompletedTimestampBetween(
            OrderStatus status,
            LocalDateTime startDate,
            LocalDateTime endDate
    );


}