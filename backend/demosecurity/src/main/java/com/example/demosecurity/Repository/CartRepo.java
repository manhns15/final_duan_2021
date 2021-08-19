package com.example.demosecurity.Repository;

import com.example.demosecurity.model.entity.Cart;
import com.example.demosecurity.model.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepo extends JpaRepository<Cart,Long> {
    List<Cart> findAllByUsers(@Param("username") String username);
}
