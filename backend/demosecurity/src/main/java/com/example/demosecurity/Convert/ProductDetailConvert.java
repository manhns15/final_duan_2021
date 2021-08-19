package com.example.demosecurity.Convert;

import com.example.demosecurity.model.dto.ProductDetailDTO;
import com.example.demosecurity.model.entity.ProductDetail;
import net.bytebuddy.utility.RandomString;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Component;

import java.nio.charset.Charset;
import java.util.Random;

@Component
public class ProductDetailConvert {
   public String getAlphaNumericString(int n)
    {
        // chose a Character random from this String
        String AlphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                + "0123456789"
                + "abcdefghijklmnopqrstuvxyz";

        // create StringBuffer size of AlphaNumericString
        StringBuilder sb = new StringBuilder(n);
        for (int i = 0; i < n; i++) {
            // generate a random number between
            // 0 to AlphaNumericString variable length
            int index
                    = (int)(AlphaNumericString.length()
                    * Math.random());
            // add Character one by one in end of sb
            sb.append(AlphaNumericString
                    .charAt(index));
        }
        return sb.toString();
    }

    public ProductDetail toEntity(ProductDetailDTO dto) {
        ProductDetail entity = new ProductDetail();
        entity.setQuantityProduct(dto.getQuantityProduct());
        entity.setStatus(dto.getStatusDetail());
        return entity;
    }

    public ProductDetailDTO toDTO(ProductDetail entity) {
        ProductDetailDTO dto = new ProductDetailDTO();
        dto.setId(entity.getId());
        dto.setProduct(entity.getProduct());
        dto.setColor(entity.getColor());
        dto.setSize(entity.getSize());
        dto.setQuantityProduct(entity.getQuantityProduct());
        dto.setPriceProductDetail(entity.getPriceProductDetail());
        dto.setStatusDetail(entity.getStatus());
        dto.setSku(entity.getSku());
        dto.setCreatedate(entity.getCreatedate());
        dto.setCreateby(entity.getCreateby());
        return dto;
    }

    public ProductDetail toEntity(ProductDetailDTO dto, ProductDetail entity) {
        String generatedString = RandomStringUtils.randomAlphanumeric(7);
        entity.setQuantityProduct(dto.getQuantityProduct());
        entity.setStatus(dto.getStatusDetail());
        entity.setSku("DHM"+ getAlphaNumericString(5));
        return entity;
    }
}
