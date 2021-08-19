package com.example.demosecurity.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Set;
@Setter
@Getter
@Entity(name = "category")
@EntityListeners(AuditingEntityListener.class)
public class Category implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdCategory")
    private Long id;
    @OneToMany(mappedBy = "category")
    @JsonIgnore
    private Set<Product> product;
    @Column(name = "name",columnDefinition = "VARCHAR(50)  NULL")
    private String name;
    @Column(name = "decription",columnDefinition = "VARCHAR(100)  NULL")
    private String decription;
    private boolean status;
    @CreatedDate
    @Temporal(TemporalType.DATE)
    private Date createdate;
    @CreatedBy
    private String createby;

    public Category(){

    }
}
