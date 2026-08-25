package com.sher.Ecomm.service;

import com.sher.Ecomm.Dto.LoginRequest;
import com.sher.Ecomm.Dto.LoginResponse;
import com.sher.Ecomm.model.User;
import com.sher.Ecomm.repo.UserRepository;
import com.sher.Ecomm.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;//Built in interface

    @Autowired
    private JwtService jwtService;

    public LoginResponse login(LoginRequest request) {
        try {
            authenticationManager.authenticate(//This is Spring Security's authentication engine.
                    //You do not compare passwords manually anymore.
                    //Earlier you had: if(user.getPassword().equals(password))
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
            System.out.println("Authentication Successful");
        }
        catch (Exception e) {
            e.printStackTrace();
            throw e;
        }

        //String token = jwtService.generateToken(request.getEmail());

       // return new LoginResponse(token);

        User user = userRepository.findByEmail(request.getEmail());

        String token = jwtService.generateToken(user.getEmail());

        return new LoginResponse(
                user.getId(),
                token,
                user.getName(),
                user.getEmail(),
                user.getRole().name()
        );
    }
}