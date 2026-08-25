package com.sher.Ecomm.service;
//Right now Spring Security doesn't know about your User table.
//When someone logs in, Spring tries to authenticate using its default in-memory user.
//This class tells Spring:"If someone logs in with an email, fetch that user from my database."

import com.sher.Ecomm.model.User;
import com.sher.Ecomm.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService
//Spring Security has an interface called UserDetailsService It contains exactly one method.loadUserByUsername()
// Whenever someone logs in, Spring automatically calls this method.
{

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {

        User user = userRepository.findByEmail(email);//This executes SELECT * FROM user WHERE email=?

        if(user == null){
            throw new UsernameNotFoundException("User Not Found");
        }

        System.out.println("===========");
        System.out.println("Email from login: " + email);
        System.out.println("User found: " + user);
        System.out.println("Stored Password: " + user.getPassword());
        System.out.println("Role: " + user.getRole());
        System.out.println("===========");



        System.out.println("Loaded User: " + user.getEmail());
        System.out.println("Stored Password: " + user.getPassword());
        System.out.println("Role: " + user.getRole());
        return org.springframework.security.core.userdetails.User
                .builder()//Spring Security expects a special object called UserDetails
                //So we convert it into Spring Security's user object.Email->Username,Encrypted Password->Password,CUSTOMER->Role
                .username(user.getEmail())
                .password(user.getPassword())

                .roles(user.getRole().name())//role is now an enum..name() converts it to CUSTOMER
                .build();


    }
}