package com.example.demosecurity.Config.jwt;
import lombok.*;

import javax.validation.constraints.NotBlank;

public class AuthRequest {
    @NotBlank(message = "Tên người dùng không thể để trống !")
    private String username;

    @NotBlank(message = "Tên người dùng không thể để trống !")
    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
