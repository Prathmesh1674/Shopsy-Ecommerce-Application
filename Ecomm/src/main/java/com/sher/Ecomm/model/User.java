package com.sher.Ecomm.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sher.Ecomm.enums.Role;
import jakarta.persistence.*;

import java.util.List;

@Entity    // Creates Tables in database
public class User {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY) //"Database, you generate the ID automatically."
    private  long   id;

    private String  name;

    private String email;

    private  String password;



    @Enumerated(EnumType.STRING)//Without it, Hibernate stores:0= ADMIN & 1= CUSTOMER
    //EnumType.STRING, the database stores: ADMIN & CUSTOMER
    //the compiler prevents invalid values, making your code safer and easier to maintain.
    private Role role;

    @JsonIgnore//used to hide specific fields of an object so they are not included when converting code data into JSON text or back to back  user->orders->user->orders Like
    //tells Jackson:"Do not include the orders field when converting a User to JSON."
    @OneToMany(mappedBy ="user", cascade=CascadeType.ALL) //Orders.java @ManyToOne private User user; The field name is user: mappedBy="user"
    //It tells Hibernate:"The relationship is managed by the user field in the Orders entity."
    //cascade = CascadeType.ALL: Imagine the database contains:User->Orders If you delete the user, Hibernate also performs the corresponding operation on related orders.So deleting the user also deletes the associated orders.
    private List<Orders> orders;


    //Getters & Setters
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }


    public List<Orders> getOrders() {
        return orders;
    }


    public void setOrders(List<Orders> orders) {
        this.orders = orders;
    }
}

