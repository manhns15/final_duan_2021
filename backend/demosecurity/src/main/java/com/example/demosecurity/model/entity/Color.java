package com.example.demosecurity.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Setter
@Getter
@Entity(name = "color")
@EntityListeners(AuditingEntityListener.class)
public class Color {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdColor")
    private Long id;
    @Column(length = 20)
    private String namecolor;
    private Integer status;
    @CreatedDate
    @Temporal(TemporalType.DATE)
    private Date createdate;
    @Column(length = 50)
    @CreatedBy
    private String createby;
    @OneToMany
    @JsonIgnore
    @JoinColumn(name = "IdColor")
    private Set<ProductDetail> ProductDetail;

}
