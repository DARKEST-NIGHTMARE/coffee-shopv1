package com.coffeeshop.coffee_shop_backend.model;

public enum AppPermission {
    MENU_READ("View the Menu"),
    MENU_MANAGE("Create/Edit/Delete Menu Items"),

    INVENTORY_READ("View Stock Levels"),
    INVENTORY_MANAGE("Create New Items & Edit Settings"),
    STOCK_ADJUST("Report Waste & Add Stock"),

    ORDER_CREATE("Place New Orders"),
    ORDER_COOK("Kitchen Display & Mark Prepared"),
    ORDER_SERVE("Mark Prepared Orders as Completed"),

    REPORTS_VIEW("View Sales Reports"),
    STAFF_MANAGE("Register & View Staff"),
    ROLE_MANAGE("Create & Edit Roles");

    private final String description;

    AppPermission(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}