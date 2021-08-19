package com.example.demosecurity.Convert;

import com.example.demosecurity.model.dto.OrderProductDetailDTO;
import com.example.demosecurity.model.entity.OrderProductDetail;
import org.springframework.stereotype.Component;

@Component
public class OrderProductDetailConvert {
    public OrderProductDetail toEntity(OrderProductDetailDTO dto){
        OrderProductDetail entity = new OrderProductDetail();
        entity.setId(dto.getId());
        entity.setStatus(1);
        return entity;
    }
}
