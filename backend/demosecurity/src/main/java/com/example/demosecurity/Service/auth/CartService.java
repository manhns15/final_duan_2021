package com.example.demosecurity.Service.auth;

import com.example.demosecurity.Convert.CartConvert;
import com.example.demosecurity.Repository.*;
import com.example.demosecurity.model.dto.*;
import com.example.demosecurity.model.entity.*;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class CartService {
    @Autowired
    private CartRepo cartRepo;
    @Autowired
    private UsersRepository usersRepository;
    private static final Logger logger = LogManager.getLogger(CartService.class);

    public Cart saveOrUpdateCart(Cart cart, String name) {
        // logic
        try {
            Users us = usersRepository.findUserByUsername(name);
            if (cart.getId() != null) {
                Cart cart1 = new Cart();
                cart1.setTensanpham(cart.getTensanpham());
                cart1.setMau(cart.getMau());
                cart1.setSize(cart.getSize());
                cart1.setSoluong(cart.getSoluong());
                cart1.setThanhtien(cart.getThanhtien());
            }
            cart.setUsers(us);
            return cartRepo.save(cart);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public List<Cart> findAllCartByUser(String name) {
        return cartRepo.findAllByUsers(name);
    }

    public Cart deleteCart(Long id, String name) {
        List<Cart> list = cartRepo.findAllByUsers(name);
        for (Cart c : list) {
            if (c.getId().equals(id)) {
                Cart cart = cartRepo.getOne(id);
                if (cart != null) {
                    cartRepo.delete(cart);
                }
            }
        }
        return null;
    }


}
