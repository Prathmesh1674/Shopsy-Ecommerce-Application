package com.sher.Ecomm.Dto;

/*
public class LoginResponse {

    private String token;

    public LoginResponse() {
    }

    public LoginResponse(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}*/

public class LoginResponse {

    private String token;
    private String name;
    private String email;
    private String role;
    private Long id;

    public LoginResponse() {
    }

    public LoginResponse(Long id,String token, String name, String email, String role) {
        this.id=id;
        this.token = token;
        this.name = name;
        this.email = email;
        this.role = role;
    }

    public LoginResponse(String token) {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}