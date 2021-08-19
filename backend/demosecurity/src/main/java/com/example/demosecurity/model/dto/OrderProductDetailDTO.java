package com.example.demosecurity.model.dto;

import com.example.demosecurity.model.entity.Order;
import com.example.demosecurity.model.entity.OrderProductDetailId;
import com.example.demosecurity.model.entity.ProductDetail;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.EntityListeners;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderProductDetailDTO {
    private OrderProductDetailId id;
    private Integer quantity;
    private Float price;
    private Integer status ;
}
