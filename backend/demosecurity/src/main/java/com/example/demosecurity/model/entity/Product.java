package com.example.demosecurity.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;


import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "product")
@EntityListeners(AuditingEntityListener.class)
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdProduct")
    private Long id;
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "IdCategory")
    private Category category;

    @Column(name = "nameproduct",columnDefinition = "VARCHAR(100)  NULL")
    private String nameproduct;

    private Float priceProduct;

    private Integer status;
    @Column(name = "image",columnDefinition = "VARCHAR(255)  NULL")
    private String image;
    @Column(name = "decription",columnDefinition = "VARCHAR(255)  NULL")
    private String decription;
    private Integer purchase;
    @CreatedDate
    @Temporal(TemporalType.DATE)
    private Date createdate;

    @Column(name = "createby",columnDefinition = "VARCHAR(30)  NULL")
    @CreatedBy
    private String createby;

    @OneToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    @JsonIgnore
    @JoinColumn(name = "IdProduct")
    Set<ProductDetail> productDetail = new HashSet<>();



    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", category=" + category +
                ", nameproduct='" + nameproduct + '\'' +
                ", priceProduct=" + priceProduct +
                ", status=" + status +
                ", image='" + image + '\'' +
                ", decription='" + decription + '\'' +
                ", purchase=" + purchase +
                ", createdate=" + createdate +
                ", createby='" + createby + '\'' +
                ", productDetail=" + productDetail +
                '}';
    }
}
