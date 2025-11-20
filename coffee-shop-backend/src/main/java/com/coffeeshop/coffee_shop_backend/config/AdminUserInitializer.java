package com.coffeeshop.coffee_shop_backend.config;

import com.coffeeshop.coffee_shop_backend.model.AppPermission;
import com.coffeeshop.coffee_shop_backend.model.AppRole;
import com.coffeeshop.coffee_shop_backend.model.StaffUser;
import com.coffeeshop.coffee_shop_backend.repository.RoleRepository;
import com.coffeeshop.coffee_shop_backend.repository.StaffUserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Optional;

@Component
public class AdminUserInitializer implements CommandLineRunner {

    private final StaffUserRepository staffUserRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminUserInitializer(StaffUserRepository staffUserRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.staffUserRepository = staffUserRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        AppRole managerRole;
        Optional<AppRole> existingRole = roleRepository.findByName("Super Manager");

        if (existingRole.isEmpty()) {
            AppRole newRole = new AppRole();
            newRole.setName("Super Manager");
            newRole.setDescription("Manager with all permissions");
            newRole.setPermissions(new HashSet<>(Arrays.asList(AppPermission.values())));
            managerRole = roleRepository.save(newRole);
            System.out.println("Created 'Super Manager' Role.");
        } else {
            managerRole = existingRole.get();
        }

        if (staffUserRepository.findByUsername("manager").isEmpty()) {
            StaffUser manager = new StaffUser();
            manager.setUsername("manager");
            manager.setHashedPassword(passwordEncoder.encode("QWERTY"));
            manager.setRole(managerRole);
            staffUserRepository.save(manager);
            System.out.println("Default 'manager' user created.");
        }
    }
}
