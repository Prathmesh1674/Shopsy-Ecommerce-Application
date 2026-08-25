package com.sher.Ecomm.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

@Entity //"Create a database table called Orders."
public class Orders {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private  long   id;

    @ManyToOne
    @JsonBackReference //This works together with @JsonIgnore to prevent infinite JSON recursion.
    //@JsonBackReference tells Jackson: "When serializing Orders, don't follow this back-reference again."This avoids endless nesting.
    private User user;

    private double totalAmount;

    private String status;

    private Date orderDate;

    @OneToMany(mappedBy = "order",cascade=CascadeType.ALL)
    private List<orderItem>orderItems;//Why not List<Product>?  Suppose you order:Laptop Quantity = 2 Product alone cannot store Quantity So we create another table OrderItem which stores Product Quantity.

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }

    public List<orderItem> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<orderItem> orderItems) {
        this.orderItems = orderItems;
    }
}
