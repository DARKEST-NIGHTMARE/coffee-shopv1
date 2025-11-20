package com.coffeeshop.coffee_shop_backend.controller;

import com.coffeeshop.coffee_shop_backend.model.AppPermission;
import com.coffeeshop.coffee_shop_backend.model.AppRole;
import com.coffeeshop.coffee_shop_backend.repository.RoleRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/roles")
public class RoleController {
    private final RoleRepository roleRepository;
    public RoleController(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }
    @GetMapping("/permissions")
    public ResponseEntity<List<Map<String, String>>> getAllPermissions() {
        List<Map<String, String>> permissions = Arrays.stream(AppPermission.values())
                .map(p -> Map.of(
                        "key", p.name(),
                        "description", p.getDescription()
                ))
                .collect(Collectors.toList());
        return ResponseEntity.ok(permissions);
    }

    @PostMapping
    public ResponseEntity<AppRole> createRole(@RequestBody AppRole role) {
        if (roleRepository.findByName(role.getName()).isPresent()) {
            throw new RuntimeException("Role name already exists");
        }
        return ResponseEntity.ok(roleRepository.save(role));
    }
    @GetMapping
    public ResponseEntity<List<AppRole>> getAllRoles() {
        return ResponseEntity.ok(roleRepository.findAll());
    }
}