package com.example.demosecurity.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
import java.util.Set;

@Entity(name = "orderproductdetail")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderProductDetail implements Serializable {
    @EmbeddedId
    private OrderProductDetailId id;

    @ManyToOne
    @MapsId("IdOrder")
    @JoinColumn(name = "IdOrder")
    @JsonIgnore
    private Order order;

    @ManyToOne
    @MapsId("IdProductDetail")
    @JoinColumn(name = "IdProductDetail")
    private ProductDetail productDetail;

    private Integer quantity;
    private Float price;
    private Integer status ;
}
