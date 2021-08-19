package com.example.demosecurity.Repository;

import com.example.demosecurity.model.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CategoryRep extends JpaRepository<Category,Long> {
    @Query("SELECT c FROM category c WHERE c.id = :id ")
    Category findCategoryById(@Param("id") Long id);
}
