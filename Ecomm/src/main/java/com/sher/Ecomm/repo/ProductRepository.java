package com.sher.Ecomm.repo;

import com.sher.Ecomm.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product,Long>//This means "This repository manages Product entities."
// Long: This represents Primary Key Type  Your Product class has private long id;
//gives you dozens of ready-made methods. And you no need to write it .
{
    List<Product> findByCategoryIgnoreCase(String category);
    //Query Method:Spring understands English-like method names.
    //find-ByCategory-IgnoreCase :Spring breaks the method into pieces.
    //find: Select,ByCategory:WHERE category = ?,IgnoreCase:Uppercase/Lowercase doesn't matter
    //eg:findByCategoryIgnoreCase("electronics")
}
