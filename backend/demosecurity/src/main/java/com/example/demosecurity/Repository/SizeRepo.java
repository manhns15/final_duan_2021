package com.example.demosecurity.Repository;

import com.example.demosecurity.model.entity.Category;
import com.example.demosecurity.model.entity.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SizeRepo extends JpaRepository<Size,Long> {
    @Query("SELECT c FROM size c WHERE c.id = :id ")
    Size findSizeById(@Param("id") Long id);
}
