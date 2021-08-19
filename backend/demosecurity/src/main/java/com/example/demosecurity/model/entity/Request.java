package com.example.demosecurity.model.entity;

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
@Entity(name = "request")
@EntityListeners(AuditingEntityListener.class)
public class Request  implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdRequest")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "IdUser")
    private Users users;

    @CreatedDate
    @Temporal(TemporalType.DATE)
    private Date createdate;

    @Column(name = "createby",columnDefinition = "VARCHAR(30)  NULL")
    @CreatedBy
    private String createby;
    @ManyToMany
    @JoinTable(
            // ten bang lien ket
            name = "request_productdetail",
            joinColumns = {@JoinColumn(name = "IdRequest", referencedColumnName = "IdRequest")},
            inverseJoinColumns = {@JoinColumn(name = "IdProductDetail", referencedColumnName = "IdProductDetail")}
    )
    Set<ProductDetail> productdetail;
}
