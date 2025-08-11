package com.tabaapps.estherssendoff.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails adminUser = User.builder()
                .username("admin")
                .password(passwordEncoder().encode("esther@2025"))
                .roles("ADMIN")
                .build();

        return new InMemoryUserDetailsManager(adminUser);
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .authorizeHttpRequests(authManager -> authManager
                        // Admin-only routes
                        //.requestMatchers(HttpMethod.POST, "/api/v1/invitation-cards").hasRole("ADMIN")
                        //.requestMatchers(HttpMethod.GET, "/api/v1/invitation-cards").hasRole("ADMIN")
                        //.requestMatchers(HttpMethod.PUT, "/api/v1/invitation-cards/{id}").hasRole("ADMIN")
                        // Public route
                        .requestMatchers(HttpMethod.GET, "/api/v1/invitation-cards/{id}").permitAll()
                        // Protected routes requiring authentication
                        .requestMatchers("/api/v1/pledges/{id}/installments/**").authenticated()
                        // All other routes are public
                        .anyRequest().permitAll())
                .csrf(AbstractHttpConfigurer::disable)
                .cors(AbstractHttpConfigurer::disable)
                .httpBasic(httpBasic -> {})  // Enable HTTP Basic authentication
                .build();
    }
}
