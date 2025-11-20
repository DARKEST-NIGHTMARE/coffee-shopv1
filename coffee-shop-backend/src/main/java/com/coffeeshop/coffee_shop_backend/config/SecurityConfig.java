package com.coffeeshop.coffee_shop_backend.config;

import com.coffeeshop.coffee_shop_backend.security.JwtAuthFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static com.coffeeshop.coffee_shop_backend.model.AppPermission.*;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    public SecurityConfig(JwtAuthFilter jwtAuthFilter, AuthenticationProvider authenticationProvider) {
        this.jwtAuthFilter = jwtAuthFilter;
        this.authenticationProvider = authenticationProvider;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                                .requestMatchers("/api/auth/**").permitAll()
                         // Menu create / update
                        .requestMatchers(HttpMethod.POST, "/api/menu/**").hasAuthority(MENU_MANAGE.name())
                        .requestMatchers(HttpMethod.PUT, "/api/menu/**").hasAuthority(MENU_MANAGE.name())
                        .requestMatchers(HttpMethod.DELETE, "/api/menu/**").hasAuthority(MENU_MANAGE.name())
                        // Menu read
                        .requestMatchers(HttpMethod.GET, "/api/menu/**").hasAnyAuthority(MENU_READ.name(), MENU_MANAGE.name(), ORDER_CREATE.name())

                        // Inventory create new items
                        .requestMatchers(HttpMethod.POST, "/api/inventory/**").hasAuthority(INVENTORY_MANAGE.name())
                        // Inventory update stock (wastes)
                        .requestMatchers(HttpMethod.PUT, "/api/inventory/**").hasAnyAuthority(INVENTORY_MANAGE.name(), STOCK_ADJUST.name())
                        .requestMatchers("/api/inventory/**").hasAnyAuthority(INVENTORY_READ.name(), INVENTORY_MANAGE.name(), STOCK_ADJUST.name())

                        // Orders
                        .requestMatchers(HttpMethod.POST, "/api/orders/**").hasAuthority(ORDER_CREATE.name()) // Barista
                        .requestMatchers("/api/orders/**").hasAnyAuthority(ORDER_CREATE.name(), ORDER_COOK.name(), ORDER_SERVE.name())

                        // Admin / Mgmt:
                        .requestMatchers("/api/reports/**").hasAuthority(REPORTS_VIEW.name())
                        .requestMatchers("/api/roles/**").hasAuthority(ROLE_MANAGE.name()) // We will build this controller next
                        .requestMatchers("/api/auth/users").hasAuthority(STAFF_MANAGE.name()) // View staff list
                        .requestMatchers("/api/auth/register").hasAuthority(STAFF_MANAGE.name()) // Register users

                        .anyRequest().authenticated()

                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                .authenticationProvider(authenticationProvider)

                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}