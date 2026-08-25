package com.sher.Ecomm.config;

import com.sher.Ecomm.security.JwtAuthenticationFilter;
import com.sher.Ecomm.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean//A Bean is simply an object managed by Spring.everywhere, Spring creates one shared object and manages it for you. (IOC Containers)

    public PasswordEncoder passwordEncoder() { //This is an interface provided by Spring Security.
        // This tells Spring how passwords should be encrypted.

        return new BCryptPasswordEncoder();//This is the actual implementation.
                                           // It encrypts passwords using the BCrypt algorithm.
    }

    @Bean
    //If the password is correct, authentication succeeds.
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration) throws Exception {

        return configuration.getAuthenticationManager();
    }


    /*@Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception
    {

        http
                .csrf(csrf -> csrf.disable())
                //CSRF stands for Cross-Site Request Forgery.
                // It mainly protects web applications that use sessions and HTML forms.
                //Since you're building a REST API that will use JWT tokens, we disable it.

                .cors(cors -> {})

                .authorizeHttpRequests(auth -> auth
                        //This tells Spring:"How should different URLs be protected?"

                                .requestMatchers("/users/register", "/auth/login")
                                .permitAll()//Public for regester and login


                                // CUSTOMER and ADMIN
                                .requestMatchers(HttpMethod.GET, "/products/**")
                                .permitAll()

                                // ADMIN only
                                .requestMatchers(HttpMethod.POST, "/products")
                                .hasRole("ADMIN")

                                .requestMatchers(HttpMethod.PUT, "/products/**")
                                .hasRole("ADMIN")

                                .requestMatchers(HttpMethod.DELETE, "/products/**")
                                .hasRole("ADMIN")

                               .anyRequest().authenticated()
                             // .anyRequest().permitAll() //Every request is allowed.
                )
                .userDetailsService(customUserDetailsService)

                .addFilterBefore(jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class);

             //   .httpBasic(Customizer.withDefaults());
        //At this stage it's mainly useful for testing that Spring Security is active.
        // Once JWT is working, we'll remove HTTP Basic because JWT will become our authentication mechanism.


        return http.build();
    }*/

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())

                .cors(cors -> cors.configurationSource(request -> {

                    var corsConfiguration = new org.springframework.web.cors.CorsConfiguration();

                    corsConfiguration.setAllowedOrigins(
                            java.util.List.of(
                                    "http://127.0.0.1:5500",
                                    "http://127.0.0.1:5501",
                                    "http://localhost:5500",
                                    "http://localhost:5501"
                            )
                    );

                    corsConfiguration.setAllowedMethods(
                            java.util.List.of(
                                    "GET",
                                    "POST",
                                    "PUT",
                                    "DELETE",
                                    "OPTIONS"
                            )
                    );

                    corsConfiguration.setAllowedHeaders(
                            java.util.List.of("*")
                    );

                    corsConfiguration.setAllowCredentials(false);

                    return corsConfiguration;
                }))

                .authorizeHttpRequests(auth -> auth

                        .requestMatchers(
                                "/users/register",
                                "/auth/login"
                        ).permitAll()

                        .requestMatchers(HttpMethod.GET, "/products/**")
                        .authenticated()

                        .requestMatchers(HttpMethod.POST, "/products")
                        .hasRole("ADMIN")

                        .requestMatchers(HttpMethod.PUT, "/products/**")
                        .hasRole("ADMIN")

                        .requestMatchers(HttpMethod.DELETE, "/products/**")
                        .hasRole("ADMIN")

                        .anyRequest().authenticated()
                )

                .userDetailsService(customUserDetailsService)

                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }
}
