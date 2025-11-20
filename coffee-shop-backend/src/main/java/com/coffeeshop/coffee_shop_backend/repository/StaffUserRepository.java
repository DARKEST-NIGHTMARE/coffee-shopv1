package com.coffeeshop.coffee_shop_backend.repository;

import com.coffeeshop.coffee_shop_backend.model.StaffUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StaffUserRepository extends JpaRepository<StaffUser, Long> {
    Optional<StaffUser> findByUsername(String username);
}