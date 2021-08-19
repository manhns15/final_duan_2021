package com.example.demosecurity.Controller;


import com.example.demosecurity.Service.auth.EmailService;
import com.example.demosecurity.Service.auth.OrderService;
import com.example.demosecurity.model.dto.*;

import com.example.demosecurity.model.entity.Cart;
import com.example.demosecurity.model.entity.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("v1/api")
@CrossOrigin(origins = "*")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping("/orders")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public List<OrderDTO> getAll() {
        return orderService.findAll();
    }

    @GetMapping("orders/boom")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public List<Order> getOrderByDom() {
        return orderService.findAllOrderByBoom();
    }

    @GetMapping("/statistical")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public Statistical getStatisticalToDay() throws ParseException {
        return orderService.findStatisticalToDay();
    }

    @PostMapping("/statistical")
    public ResponseEntity<?> create(@RequestBody Statistical statistical) throws ParseException {
        Statistical period1 = orderService.findStatisticalPeriod(statistical);
        return ResponseEntity.ok().body(period1);
    }

    @GetMapping("orders/boom/{phone}")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public List<Order> getOrderByDomAndPhone(@PathVariable String phone) {
        return orderService.findAllOrderByBoomAndPhone(phone);
    }

    @GetMapping("/orders/status")
    @ResponseStatus(HttpStatus.CREATED)
    public List<Integer> getStatus() {
        return orderService.findStatus();
    }

    @GetMapping("/orders/bystatus/{status}")
    @ResponseStatus(HttpStatus.CREATED)
    public List<Order> getOrderAllByStatus(@PathVariable Integer status) {
        return orderService.findOrderBySatatus(status);
    }

    @GetMapping("/orders/user")
    @ResponseStatus(HttpStatus.CREATED)
    public List<Order> findOrderByUser(Principal pc) {
        return orderService.findOrderByUsername(pc.getName());
    }

    // đây là api lấy hóa đơn theo user
    @GetMapping("/orders/user/{status}")
    @ResponseStatus(HttpStatus.CREATED)
    public List<Order> findOrderByUserAndStatus(@PathVariable("status") Integer status, Principal pc) {
        return orderService.findOrderByUsernameAndStatus(status, pc.getName());
    }

    @GetMapping("/orders/sku/{sku}")
    @ResponseStatus(HttpStatus.CREATED)
    public Order findOrderBySku(@PathVariable("sku") String sku) {
        return orderService.findOrderBySku(sku);
    }


    @PostMapping("/orders")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public OrderDTO createOrder(@RequestBody OrderDTO orderDTO, Principal pc) {
        try {
            if (pc != null) {
                return orderService.save(orderDTO, pc.getName());
            } else {
                return orderService.save(orderDTO, null);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    @PutMapping(value = "/orders/{id}")
    public OrderDTO updateNew(@RequestBody OrderDTO orderDTO, @PathVariable("id") long id) {
        orderDTO.setId(id);
        return orderService.update(orderDTO);
    }


    @DeleteMapping(value = "/orders/{id}")
    public void deleteNew(@PathVariable("id") Long id) {
        orderService.delete(id);
    }


}
