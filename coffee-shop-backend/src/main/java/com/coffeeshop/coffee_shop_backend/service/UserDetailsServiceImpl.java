package com.coffeeshop.coffee_shop_backend.service;

import com.coffeeshop.coffee_shop_backend.repository.StaffUserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private final StaffUserRepository staffUserRepository;

    public UserDetailsServiceImpl(StaffUserRepository staffUserRepository){
        this.staffUserRepository=staffUserRepository;
    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
        return staffUserRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username"+username));
    }
}
