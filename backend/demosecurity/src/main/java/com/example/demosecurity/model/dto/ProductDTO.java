package com.example.demosecurity.model.dto;

import com.example.demosecurity.model.entity.Category;
import com.example.demosecurity.model.entity.ProductDetail;
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
import java.util.Date;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class ProductDTO {
    private Long id;
    private Long idcategory;
    private Category category;
    private String nameproduct;
    private Set<ProductDetailDTO> productDetails;
    private Set<ProductDetail> list;
    private Float priceProduct;
    private Integer status;
    private String image;
    private String decription;
    private Integer purchase;
    @CreatedDate
    @Temporal(TemporalType.DATE)
    private Date createdate;
    @CreatedBy
    private String createby;


}
