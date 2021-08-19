package com.example.demosecurity.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Setter
@Getter
@EntityListeners(AuditingEntityListener.class)
@Entity(name = "cart")
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdCart")
    private Long id;
    @OneToOne
    @JoinColumn(name = "IdUser")
    private Users users;
    @Column(length = 150)
    private String tensanpham;
    @Column(length = 50)
    private String mau;
    @Column(length = 25)
    private String size;
    private Integer Soluong;
    private String thanhtien;
    @CreatedDate
    @Temporal(TemporalType.DATE)
    private Date createdate;
    @Column(length = 50)
    @CreatedBy
    private String createby;
}
