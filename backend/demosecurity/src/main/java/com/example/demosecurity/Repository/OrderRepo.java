package com.example.demosecurity.Repository;

import com.example.demosecurity.model.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface OrderRepo extends JpaRepository<Order,Long> {

    @Query("select o FROM orders o where o.Id = :id")
    Order findOrdersById(@Param("id") Long id);

    @Query("select DISTINCT o.status FROM orders o ")
    List<Integer> getByStatus();

    @Query("select o FROM orders o where o.status = :status")
    List<Order> findAllByStatus(@Param("status") Integer status);

    @Query("select o FROM orders o where o.users.username = :username")
    List<Order> findAllByUsername(@Param("username") String username);

    @Query("select o FROM orders o where o.users.username = :username and o.status = :status")
    List<Order> findAllByUsernameAndStatus(@Param("status") Integer status,@Param("username") String username);


    List<Order> findAllByBoomGreaterThanAndPhone(Integer boom,String Phone);

    @Query("select  DISTINCT o.phone  FROM orders o where o.boom > :boom")
    List<String> findDistinctByPhone(@Param("boom") Integer boom);

    @Query("select count(o.status) FROM orders o where o.boom > :boom and o.phone =:phone")
    Integer countByBoomAndBoomGreaterThanEqual(@Param("boom") Integer boom,@Param("phone") String phone);

    Order findOrderBySku(String sku);
    Order findOrderBySkuAndUsers(String sku,String user);


    @Query("select o FROM orders o where o.createdate = :createdate")
    List<Order> findAllByTotalMoney(@Param("createdate") Date createdate);
    @Query("select o FROM orders o where o.createdate = :createdate and o.status = :status")
    List<Order> findAllByStatusCancle(@Param("createdate") Date createdate , @Param("status") Integer status);
    @Query("select count(o) FROM orders o where o.createdate = :createdate ")
    Integer findAllCoutnOrderByCreatedateAndTotalOrder(@Param("createdate") Date createdate);
    @Query("select count(o) FROM orders o where o.createdate = :createdate and o.status = :status")
    Integer findAllCoutnOrderByCreatedateAndStatus(@Param("createdate") Date createdate,@Param("status") Integer status);


    @Query("select o FROM orders o where o.createdate BETWEEN  ?2 and ?1 ")
    List<Order> findAllByTotalMoneyBetween(Date curentdate,Date perioddate);
    @Query("select o FROM orders o where  o.createdate BETWEEN  ?2 and ?1 and o.status =  ?3")
    List<Order> findAllByTotalMoneyStatusCancleBetween(@Param("curentdate") Date curentdate,@Param("perioddate") Date perioddate, @Param("status") Integer status);
    @Query("select count(o) FROM orders o where  o.createdate BETWEEN  ?2 and ?1 ")
    Integer findAllCoutnOrderByCreatedateAndTotalOrderBetween(@Param("curentdate") Date curentdate,@Param("perioddate") Date perioddate);
    @Query("select count(o) FROM orders o where  o.createdate BETWEEN  ?2 and ?1 and o.status =  ?3")
    Integer findAllCoutnOrderByCreatedateAndStatusBetween( @Param("curentdate") Date curentdate,@Param("perioddate") Date perioddate,@Param("status") Integer status);

}
