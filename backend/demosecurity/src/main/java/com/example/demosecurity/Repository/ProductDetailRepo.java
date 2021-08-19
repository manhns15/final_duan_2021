package com.example.demosecurity.Repository;

import com.example.demosecurity.model.entity.Category;
import com.example.demosecurity.model.entity.Product;
import com.example.demosecurity.model.entity.ProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductDetailRepo extends JpaRepository<ProductDetail,Long> {
    @Query("SELECT c FROM productdetail c order by c.createdate desc")
    List<ProductDetail> findAll();
    @Query("SELECT c FROM productdetail c WHERE c.id = :id order by c.createdate desc")
    ProductDetail findProductDetailById(@Param("id") Long id);
    @Query("SELECT c FROM productdetail c WHERE c.product.id = :productid order by c.createdate desc")
    List<ProductDetail> findByProductId(@Param("productid")  Long productid);

    ProductDetail findBySku(String sku);
}
