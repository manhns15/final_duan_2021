package com.example.demosecurity.model.entity;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@Setter
@Entity(name = "users")
@EntityListeners(AuditingEntityListener.class)
public class Users {
    @Id
    @Column(name = "IdUser")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "fullname",columnDefinition = "VARCHAR(100)")
    private String fullname;

    @Column(unique=true,name = "username",columnDefinition = "VARCHAR(20)  NULL")
    private String username;

    @Column(name = "password",columnDefinition = "VARCHAR(100)  NULL")
    @JsonIgnore
    private String password;

    @Column(unique=true,name = "email",columnDefinition = "VARCHAR(35)  NULL")
    private String email;

    @Column(unique=true,name = "sodienthoai",columnDefinition = "VARCHAR(10)  NULL")
    private String sodienthoai;

    private Boolean Status;

    @Column(name = "address",columnDefinition = "VARCHAR(200)")
    private String address;

    private String codeOtp;

    private String image;
    @CreatedDate
    @Temporal(TemporalType.DATE)
    private Date createdate;

    @CreatedBy
    private String createby;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_role", joinColumns = @JoinColumn(name = "IdUser"), inverseJoinColumns = @JoinColumn(name = "IdRole"))
    private Set<Role> roles = new HashSet<>();


    public Users() {
    }

    public Users(String username, String password, String email,String sodienthoai) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.sodienthoai=sodienthoai;
    }
}
