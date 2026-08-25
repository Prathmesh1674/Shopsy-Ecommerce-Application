package com.sher.Ecomm.controller;
//Instead of:
//
//UserController
//    Register
//    Login
//    Get Users

//AuthController
//    Register
//    Login
//
//UserController
//    Get Users
//    Update Profile
//    Delete User
//
//This is how professional Spring Boot projects are organized.


import com.sher.Ecomm.Dto.LoginRequest;
import com.sher.Ecomm.Dto.LoginResponse;
import com.sher.Ecomm.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {

        return authenticationService.login(request);
    }
}