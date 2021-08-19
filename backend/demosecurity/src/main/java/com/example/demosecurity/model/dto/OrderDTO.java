package com.example.demosecurity.model.dto;


import com.example.demosecurity.model.entity.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.EntityListeners;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class OrderDTO {
    private Long Id;
    private Users user;
    private Long idUser;
    private Long idcustomer;
    private String namecustom;
    private String email;
    private String phone;
    private String address;
    private String paymentmethod;
    private String decription;
    private String quantityOrder;
    private Float totalMonenyOrder;
    private Float deposit;
    private String sku;
    private Integer reason;
    private Integer vat;
    private Integer boom;
    private Integer status;
    @CreatedDate
    @Temporal(TemporalType.DATE)
    private Date createdate;
    @CreatedBy
    private String createby;
    // phan nay de show thong ke
//    private Integer totalOrder;
//    private Integer statusAccept;
//    private Integer statusGetProduct;
//    private Integer statusDelivery;
//    private Integer statusSucces;
//    private Integer statusCancel;
    private Set<ProductDetailDTO> productDetailList ;
    private Set<OrderProductDetail> orderProductDetails ;
}
