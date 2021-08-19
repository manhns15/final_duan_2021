package com.example.demosecurity.model.dto;

public class InvalidLoginRespone {
    private String username;
    private String password;

    public InvalidLoginRespone() {
        this.username = "Username không hợp lệ !";
        this.password = "Password  không hợp lệ !";
    }

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
