package com.example.demosecurity.Controller;

import com.example.demosecurity.Service.auth.CartService;
import com.example.demosecurity.Service.auth.CategoryService;
import com.example.demosecurity.Service.auth.OrderService;
import com.example.demosecurity.model.dto.CartDTO;
import com.example.demosecurity.model.dto.CategoryDTO;
import com.example.demosecurity.model.entity.Cart;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("v1/api")
@CrossOrigin(origins = "*")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("cart")
    public HttpEntity<?> create (@RequestBody Cart cart,Principal pc){
        Cart cart1 = cartService.saveOrUpdateCart(cart,pc.getName());
        return  new ResponseEntity<Cart>(cart1, HttpStatus.CREATED);
    }

    @GetMapping("/carts/all")
    public HttpEntity<List<Cart>> findAll(Principal pc){
        return  new ResponseEntity<>(cartService.findAllCartByUser(pc.getName()), HttpStatus.OK);
    }

    @DeleteMapping("cart/{id}")
    public HttpEntity<?> delete (@PathVariable("id") Long id,Principal pc){
        return  new ResponseEntity<Cart>(cartService.deleteCart(id,pc.getName()), HttpStatus.CREATED);
    }
}
