package com.example.demosecurity.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.Set;

@Getter
@Setter
@Entity(name = "orders")
@EntityListeners(AuditingEntityListener.class)
public class Order {
    @Id
    @Column(name="IdOrder")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "IdUser")
    private Users users;

    @Column(length = 50)
    private String namecustom;
    @Column(length = 50)
    private String email;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "IdOrder")
    private Set<OrderProductDetail> orderProductDetails;

    @Column(length = 15)
    private String phone;
    @Column(length = 200)
    private String address;
    @Column(length = 20)
    private String sku;
    private Integer vat;
    private String quantityOrder;
    @Column(length = 20)
    private String paymentmethod;
    @Column(length = 255)
    private String decription;
    private Float totalMonenyOrder;
    private Float deposit;
    private Integer reason;
    private Integer boom;
    @CreatedDate
    @Temporal(TemporalType.DATE)
    private Date createdate;
    @Column(length = 50)
    @CreatedBy
    private String createby;
    private Integer status;
}
