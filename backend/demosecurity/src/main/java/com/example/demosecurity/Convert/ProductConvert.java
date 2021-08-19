package com.example.demosecurity.Convert;


import com.example.demosecurity.model.dto.ProductDTO;
import com.example.demosecurity.model.entity.Category;
import com.example.demosecurity.model.entity.Product;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Component;

import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Component
public class ProductConvert {

    public Product toEntity(ProductDTO dto) {
        Product entity = new Product();
        String generatedString = RandomStringUtils.randomAlphanumeric(7);
        entity.setNameproduct(dto.getNameproduct());
        entity.setPriceProduct(dto.getPriceProduct());
        entity.setStatus(dto.getStatus());
        entity.setImage(dto.getImage());
        entity.setDecription(dto.getDecription());
       entity.setPurchase(dto.getPurchase());
        return entity;
    }

    public ProductDTO toDTO(Product entity) {
        ProductDTO dto = new ProductDTO();
        dto.setId(entity.getId());
        dto.setCategory(entity.getCategory());
        dto.setNameproduct(entity.getNameproduct());
        dto.setPriceProduct(entity.getPriceProduct());
        dto.setStatus(entity.getStatus());
        dto.setImage(entity.getImage());
        dto.setPurchase(entity.getPurchase());
        dto.setCreatedate(entity.getCreatedate());
        dto.setCreateby(entity.getCreateby());
        return dto;
    }

    public Product toEntity(ProductDTO dto, Product entity) {
        entity.setNameproduct(dto.getNameproduct());
        entity.setPriceProduct(dto.getPriceProduct());
        entity.setStatus(dto.getStatus());
        entity.setImage(dto.getImage());
        entity.setDecription(dto.getDecription());
        entity.setPurchase(dto.getPurchase());
        return entity;
    }

}
