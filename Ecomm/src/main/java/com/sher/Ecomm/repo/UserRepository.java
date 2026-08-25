package com.sher.Ecomm.repo;

import com.sher.Ecomm.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {

    User findByEmail(String email);
    //SELECT *FROM user WHERE email=?;

}

