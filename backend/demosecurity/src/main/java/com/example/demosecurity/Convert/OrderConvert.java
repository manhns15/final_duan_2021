package com.example.demosecurity.Convert;

import com.example.demosecurity.Service.auth.UserService;
import com.example.demosecurity.model.dto.ERole;
import com.example.demosecurity.model.dto.OrderDTO;
import com.example.demosecurity.model.dto.ProductDetailDTO;
import com.example.demosecurity.model.entity.Order;
import com.example.demosecurity.model.entity.ProductDetail;
import com.example.demosecurity.model.entity.Role;
import com.example.demosecurity.model.entity.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@Component
public class OrderConvert {
    @Autowired
    private UserService userService;

    public String getAlphaNumericString(int n)
    {
        // chose a Character random from this String
        String AlphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                + "0123456789";

        // create StringBuffer size of AlphaNumericString
        StringBuilder sb = new StringBuilder(n);
        for (int i = 0; i < n; i++) {
            // generate a random number between
            // 0 to AlphaNumericString variable length
            int index
                    = (int)(AlphaNumericString.length()
                    * Math.random());
            // add Character one by one in end of sb
            sb.append(AlphaNumericString
                    .charAt(index));
        }
        return sb.toString();
    }
    public Order toEntity(OrderDTO dto,String name) {
        Users users = userService.findUserUsername(name);
        Order entity = new Order();
        entity.setPhone(dto.getPhone());
        entity.setNamecustom(dto.getNamecustom());
        entity.setEmail(dto.getEmail());
        entity.setAddress(dto.getAddress());
        entity.setSku(getAlphaNumericString(5));
        entity.setPaymentmethod(dto.getPaymentmethod());
        entity.setTotalMonenyOrder(dto.getTotalMonenyOrder());
        entity.setBoom(0);
        if (users != null) {
            for (Role role: users.getRoles()
            ) {
                if(role.getNamerole().equals(ERole.ROLE_MODERATOR) || role.getNamerole().equals(ERole.ROLE_ADMIN)){
                    entity.setStatus(3);
                }else {
                    entity.setStatus(0);
                }
            }
        }
        else  {
            entity.setStatus(0);
        }
        entity.setDeposit(dto.getDeposit());
        entity.setReason(dto.getReason());
        entity.setVat(10);

        return entity;
    }

    public OrderDTO toDTO(Order entity) {
        OrderDTO dto = new OrderDTO();
        dto.setId(entity.getId());
        dto.setNamecustom(entity.getNamecustom());
        dto.setUser(entity.getUsers());
        dto.setPhone(entity.getPhone());
        dto.setEmail(entity.getEmail());
        dto.setSku(entity.getSku());
        dto.setAddress(entity.getAddress());
        dto.setStatus(entity.getStatus());
        dto.setTotalMonenyOrder(entity.getTotalMonenyOrder());
        dto.setPaymentmethod(entity.getPaymentmethod());
        dto.setCreatedate(entity.getCreatedate());
        dto.setBoom(entity.getBoom());
        dto.setVat(entity.getVat());
        dto.setReason(entity.getReason());
        dto.setDeposit(entity.getDeposit());
        dto.setCreateby(entity.getCreateby());
        entity.setPaymentmethod(dto.getPaymentmethod());
        dto.setOrderProductDetails(entity.getOrderProductDetails());
        return dto;
    }

    public Order toEntityToDTO(OrderDTO dto, Order entity) {
        entity.setPhone(dto.getPhone());
        entity.setUsers(dto.getUser());
        entity.setNamecustom(dto.getNamecustom());
        entity.setEmail(dto.getEmail());
        entity.setAddress(dto.getAddress());
        entity.setDeposit(dto.getDeposit());
        entity.setQuantityOrder(dto.getQuantityOrder());
        entity.setVat(dto.getVat());
        entity.setReason(dto.getReason());
        if(dto.getStatus() == 4 || entity.getReason()==2){
            entity.setStatus(dto.getStatus());
            entity.setBoom(1);
        }
        entity.setTotalMonenyOrder(dto.getTotalMonenyOrder()-dto.getDeposit());
        entity.setPaymentmethod(dto.getPaymentmethod());
        entity.setStatus(dto.getStatus());
        return entity;
    }
}
