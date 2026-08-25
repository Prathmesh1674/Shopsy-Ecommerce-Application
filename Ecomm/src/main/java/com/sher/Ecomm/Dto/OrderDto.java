package com.sher.Ecomm.Dto;

import java.util.Date;
import java.util.List;

public class OrderDto {


    private Long id;
    private double totalAmount;
    private String status;
    private Date date;
    private String userName;
    private  String email;

    private List<OrderItemDto> orderItems;

    public OrderDto(Long id, double totalAmount, String status, Date date, String userName, String email, List<OrderItemDto> orderItems) {
        this.id = id;
        this.totalAmount = totalAmount;
        this.status = status;
        this.date = date;
        this.userName = userName;
        this.email = email;
        this.orderItems = orderItems;
    }

    public OrderDto(long id, double totalAmount, String status, Date orderDate, List<OrderItemDto> orderItemDTOS) {
        this.id = id;
        this.totalAmount = totalAmount;
        this.status = status;
        this.date = orderDate;
        this.orderItems = orderItemDTOS;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<OrderItemDto> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItemDto> orderItems) {
        this.orderItems = orderItems;
    }
}
