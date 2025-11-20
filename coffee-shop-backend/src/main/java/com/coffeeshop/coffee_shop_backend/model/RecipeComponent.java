package com.coffeeshop.coffee_shop_backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "recipe_components")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecipeComponent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "menu_item_id", nullable = false)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private MenuItem menuItem;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "inventory_item_id", nullable = false)
    private InventoryItem inventoryItem;

    @Column(nullable = false)
    private double quantityConsumed;
}