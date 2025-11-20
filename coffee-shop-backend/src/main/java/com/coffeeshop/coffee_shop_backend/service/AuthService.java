package com.coffeeshop.coffee_shop_backend.service;

import com.coffeeshop.coffee_shop_backend.dto.AuthResponse;
import com.coffeeshop.coffee_shop_backend.dto.LoginRequest;
import com.coffeeshop.coffee_shop_backend.dto.RegisterRequest;
import com.coffeeshop.coffee_shop_backend.dto.StaffUserResponseDto;
import com.coffeeshop.coffee_shop_backend.model.AppRole;
import com.coffeeshop.coffee_shop_backend.model.StaffUser;
import com.coffeeshop.coffee_shop_backend.repository.RoleRepository;
import com.coffeeshop.coffee_shop_backend.repository.StaffUserRepository;
import com.coffeeshop.coffee_shop_backend.security.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AuthService {

    private final StaffUserRepository staffUserRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthService(StaffUserRepository staffUserRepository,
                       RoleRepository roleRepository,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService,
                       AuthenticationManager authenticationManager) {
        this.staffUserRepository = staffUserRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public AuthResponse register(RegisterRequest request) {
        AppRole role = roleRepository.findById(request.roleId())
                .orElseThrow(() -> new RuntimeException("Role Not Found"));
        StaffUser user = new StaffUser();
        user.setUsername(request.username());
        user.setHashedPassword(passwordEncoder.encode(request.password()));
        user.setRole(role);

        staffUserRepository.save(user);

        String jwtToken = jwtService.generateToken(user);

        return new AuthResponse(jwtToken, user.getUsername(), user.getRole().getName());
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.username(),
                        request.password()
                )
        );

        StaffUser user = staffUserRepository.findByUsername(request.username())
                .orElseThrow(() -> new RuntimeException("User not found after authentication"));

        String jwtToken = jwtService.generateToken(user);

        return new AuthResponse(jwtToken, user.getUsername(), user.getRole().getName());
    }

    public List<StaffUserResponseDto> getAllStaff(){
        return staffUserRepository.findAll().stream()
                .map(StaffUserResponseDto::fromEntity)
                .collect(Collectors.toList());
    }
}