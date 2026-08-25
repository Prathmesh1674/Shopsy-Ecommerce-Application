package com.sher.Ecomm.service;

import com.sher.Ecomm.Dto.OrderDto;
import com.sher.Ecomm.Dto.OrderItemDto;
import com.sher.Ecomm.model.Orders;
import com.sher.Ecomm.model.Product;
import com.sher.Ecomm.model.User;
import com.sher.Ecomm.model.orderItem;
import com.sher.Ecomm.repo.OrderRepository;
import com.sher.Ecomm.repo.ProductRepository;
import com.sher.Ecomm.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;


@Service
public class OrderService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;
    public OrderDto placeOrder(Long userId, Map<Long, Integer> productQuantities, double totalAmount) {
        User user= userRepository.findById(userId)
                .orElseThrow(()->new RuntimeException("User not found"));

        Orders order=new Orders();
        order.setUser(user);
        order.setOrderDate(new Date());
        order.setStatus("Pending");
        order.setTotalAmount(totalAmount);

        List<orderItem> orderItems=new ArrayList<>();
        List<OrderItemDto> orderItemDTOS=new ArrayList<>();

        for(Map.Entry<Long, Integer> entry:productQuantities.entrySet())
        {
            Product product= productRepository.findById(entry.getKey())
                    .orElseThrow(()->new RuntimeException("Product Not found"));

            orderItem orderItem1=new orderItem();
            orderItem1.setOrder(order);
            orderItem1.setProduct(product);
            orderItem1.setQuantity(entry.getValue());
            orderItems.add(orderItem1);

            orderItemDTOS.add(new OrderItemDto(product.getName(),product.getPrice(),entry.getValue()));
        }

        order.setOrderItems(orderItems);
        Orders saveOrder = orderRepository.save(order);
        return new OrderDto(saveOrder.getId(), saveOrder.getTotalAmount()
                ,saveOrder.getStatus(),saveOrder.getOrderDate(),orderItemDTOS);
    }

    public List<OrderDto> getAllOrders() {
        List<Orders> orders = orderRepository.findAllOrdersWithUsers();
        return orders.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    private OrderDto convertToDTO(Orders orders) {
        List<OrderItemDto> OrderItems = orders.getOrderItems().stream()
                .map(item -> new OrderItemDto(
                        item.getProduct().getName(),
                        item.getProduct().getPrice(),
                        item.getQuantity())).collect(Collectors.toList());
        return new OrderDto(
                orders.getId(),
                orders.getTotalAmount(),
                orders.getStatus(),
                orders.getOrderDate(),
                orders.getUser()!=null ? orders.getUser().getName() : "Unknown",
                orders.getUser()!=null ? orders.getUser().getEmail() : "Unknown",
                OrderItems
        );
    }

    public List<OrderDto> getOrderByUser(Long userId) {
        Optional<User> userOp = userRepository.findById(userId);
        if(userOp.isEmpty())
        {
            throw  new RuntimeException("user not found");
        }
        User user= userOp.get();
        List<Orders> ordersList = orderRepository.findByUser(user);
        return ordersList.stream().map(this::convertToDTO).collect(Collectors.toList());
    }
}