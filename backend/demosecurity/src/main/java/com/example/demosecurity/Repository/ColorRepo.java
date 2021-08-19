package com.example.demosecurity.Repository;

import com.example.demosecurity.model.entity.Category;
import com.example.demosecurity.model.entity.Color;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ColorRepo extends JpaRepository<Color,Long> {
    @Query("SELECT c FROM color c WHERE c.id = :id ")
    Color findColorById(@Param("id") Long id);
}
