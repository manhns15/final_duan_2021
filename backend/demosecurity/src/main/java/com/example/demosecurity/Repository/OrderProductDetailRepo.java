package com.example.demosecurity.Repository;

import com.example.demosecurity.model.entity.Order;
import com.example.demosecurity.model.entity.OrderProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderProductDetailRepo extends JpaRepository<OrderProductDetail,Long> {
    @Query("select o FROM orderproductdetail o where o.order.Id = :id")
    List<OrderProductDetail> findOrderProductDetailBys(@Param("id") Long id);
}
