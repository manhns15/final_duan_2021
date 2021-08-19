package com.example.demosecurity.Config.jwt;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.*;
import java.util.Set;
@Getter
@Setter
public class SignupRequest {
    @NotBlank(message = "Vui lòng nhập username lớn hơn 4 ký tự !")
    @Size(min = 5, max = 20)
    private String username;

    @NotBlank(message = "Vui lòng nhập password lớn hơn 5 ký tự !")
    @Size(min = 6, max = 20)
    private String password;

    @NotBlank(message = "Vui lòng nhập email !")
    @Size(max = 50)
    @Email(message = "Vui lòng nhập email đúng định dạng !")
    private String email;

    @NotBlank
    @Size(max = 10)
    private String sodienthoai;
    private String fullname;
    private Boolean status;
    private String address;
    private String image;
    private String codeOtp;
    private Set<String> role;
}
