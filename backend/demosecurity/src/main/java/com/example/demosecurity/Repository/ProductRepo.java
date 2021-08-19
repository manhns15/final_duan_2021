package com.example.demosecurity.Repository;



import com.example.demosecurity.model.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;


@Repository
public interface ProductRepo extends JpaRepository<Product,Long> {
    @Query("SELECT c FROM product c WHERE c.id =:id order by c.createdate desc")
    Product findProductById(@Param("id") Long id);
    List<Product> findByCategoryIdOrderByCreatedateDesc(Long idcategory);
    List<Product> findAllByNameproductContaining(String name);
    @Query("select count(c) FROM product c where c.status = :status")
    Integer findAllCoutnTotalProduct(@Param("status") Integer status);

//    @Query("select c FROM product c order by c.createdate desc")
    List<Product> findAllByOrderByCreatedateAsc();
}
