package com.sher.Ecomm.service;

import com.sher.Ecomm.model.User;
import com.sher.Ecomm.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.sher.Ecomm.enums.Role;

import java.util.List;

//Controller = Receives requests
//Service = Business logic
//Repository = Database operation
@Service//"This class contains business logic."
public class UserService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired//Dependency Injection :UserRepository is an interface.Interfaces cannot be instantiated.
    // With Spring creates UserRepository Object automatically.
    // Then @Autowired injects that object into private UserRepository userRepository;
    private UserRepository userRepository;

    public User registerUser(User user) {
        try
        {
            System.out.println("===== REGISTER API CALLED =====");
            // User newUser = userRepository.save(user);

            user.setPassword(passwordEncoder.encode(user.getPassword()));//PassWord Encoded
            //user.setRole("CUSTOMER");
            user.setRole(Role.CUSTOMER);
            User newUser = userRepository.save(user);
            System.out.println("User Added to database");
            return newUser;
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
        return null;
    }

    public User loginUser(String email, String password) {
        //check if user is there or not
        User user = userRepository.findByEmail(email);
        if(user!=null && user.getPassword().equals(password))//.equals() compares the actual string content.
        {
            return user;
        }
        return null;// invalid credentials
    }
    //This is tranfered at AuthenticationService.java

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}