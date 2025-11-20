package com.coffeeshop.coffee_shop_backend.dto;

import java.math.BigDecimal;
import java.util.List;

public record SalesReportDto(
        BigDecimal totalRevenue,
        Long totalOrders,
        List<TopSellingItemDto> topSellingItems,
        List<SalesByCategoryDto> salesByCategory
) {
}
