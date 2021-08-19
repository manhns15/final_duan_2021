package com.example.demosecurity.Service.auth;

import com.example.demosecurity.Repository.UsersRepository;
import com.example.demosecurity.model.entity.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private UsersRepository usersRepository;

    public List<Users> findAllUser(){
        List<Users> result = usersRepository.findAll();
            return result;
    }
    public List<Users> findAllUserByRoleAdmin(){
        List<Users> result = usersRepository.findAll();
            return result;
    }

    public List<Users> findAllUserRoleMod(){
        List<Users> result = usersRepository.findAll();
            return result;
    }
    public Users findUserById(Long id){
       return usersRepository.findUsersById(id);
    }

    public Users findUserUsername(String username){
        return usersRepository.findUserByUsername(username);
    }

    public Users findUserByEmailAndSodienthoai(String email){
        return usersRepository.findUserByEmailAndSodienthoai(email);
    }
    public Users findUserByOtp(String otp){
        return usersRepository.findUserByCodeOtp(otp);
    }

}
