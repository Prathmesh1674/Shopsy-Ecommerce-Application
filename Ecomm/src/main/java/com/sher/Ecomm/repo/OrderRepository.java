package com.sher.Ecomm.repo;

import com.sher.Ecomm.model.Orders;
import com.sher.Ecomm.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderRepository extends JpaRepository<Orders,Long> {

    @Query("SELECT o from Orders o JOIN FETCH o.user")//YOU wrote JPQL.Not SQL.
    //Normally Hibernate loads Orders only.User is loaded later (lazy loading, depending on configuration).
        // But JOIN FETCH means Load Order AND User together in one query.This reduces extra database queries.
    List<Orders> findAllOrdersWithUsers();

    List<Orders> findByUser(User user);
    //SELECT * FROM orders WHERE user_id=?
}


//Controller = Receives requests
//Service = Business logic
//Repository = Database operation