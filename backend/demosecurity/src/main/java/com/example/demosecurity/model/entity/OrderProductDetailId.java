package com.example.demosecurity.model.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Setter
@Getter
@Embeddable
public class OrderProductDetailId implements Serializable {
    private Long IdOrder;
    private Long IdProductDetail;
}
