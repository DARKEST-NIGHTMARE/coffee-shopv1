package com.coffeeshop.coffee_shop_backend.dto;

import java.math.BigDecimal;

public interface SalesByCategoryDto {
    String getCategory();
    BigDecimal getTotalSales();
}