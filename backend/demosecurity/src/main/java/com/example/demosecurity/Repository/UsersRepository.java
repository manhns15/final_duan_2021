package com.example.demosecurity.Repository;

import com.example.demosecurity.model.entity.Users;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsersRepository extends JpaRepository<Users, Long> {
    Users findUsersById(@Param("id") Long id);
    @Query("SELECT u FROM users u WHERE u.username= :username")
    Users findUserByUsername(@Param("username") String username);
    Optional<Users> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
    Boolean existsBySodienthoai(String sodienthoai);
    @Query("SELECT u FROM users u WHERE u.email= :email")
    Users findUserByEmailAndSodienthoai(@Param("email") String email);

    @Query("SELECT u FROM users u WHERE u.sodienthoai= :sdt")
    Users findUserBySodienthoai(@Param("sdt") String sdt);

    @Query("SELECT u FROM users u WHERE u.codeOtp= :otp")
    Users findUserByCodeOtp(@Param("otp") String otp);


//    @Query("Select u from  users u left join users b on u.id= b.idUser where b.namerole = 'ROLE_USER'")
//    List<Users> findUserByRoleAdmin(@Param("username") String username);
//    List<Users> findUserByRoleAdmin(@Param("username") String username);

}
