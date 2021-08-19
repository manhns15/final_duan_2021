package com.example.demosecurity.Controller;

import com.example.demosecurity.Repository.RoleRepository;
import com.example.demosecurity.Repository.UsersRepository;
import com.example.demosecurity.Service.auth.MapValidationService;
import com.example.demosecurity.Config.service.UserDetailsImpl;
import com.example.demosecurity.Service.auth.UserService;
import com.example.demosecurity.model.dto.ERole;
import com.example.demosecurity.model.dto.MessageResponse;
import com.example.demosecurity.model.entity.Role;
import com.example.demosecurity.model.entity.Users;
import com.example.demosecurity.Config.jwt.AuthRequest;
import com.example.demosecurity.Config.jwt.AuthenticationResponse;
import com.example.demosecurity.Config.jwt.SignupRequest;
import com.example.demosecurity.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/secure/auth")
public class APIAdminController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtUtil jwtUtils;

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private UserService userService;
    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    BCryptPasswordEncoder encode;

    @Autowired
    private MapValidationService mapValidationService;
    /*@PreAuthorize("hasAnyRole('ADMIN')")*/
    // hàm đó viết đi
    //chức năng đăng ký truyền xuống username,password viết như hàn thêm
//    @PostMapping("/admin/add")
//    public String addUserByAdmin(@RequestBody Users user) {
//        String pwd = user.getPassword();
//        String encryptPwd = bCryptPasswordEncoder.encode(pwd);
//        user.setPassword(encryptPwd);
//        usersRepository.save(user);
//        return "user added successfully...";
//    }


    @PostMapping("/signin")
    public ResponseEntity<?> createAuthenticationToken(@Valid @RequestBody AuthRequest authReq, BindingResult result) {
        ResponseEntity<?> errors = mapValidationService.mapValidation(result);
        if(errors!=null){
            return errors;
        }
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authReq.getUsername(), authReq.getPassword()));


        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new AuthenticationResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        System.out.println("hihi"+usersRepository.existsByUsername(signUpRequest.getUsername()));
        if (usersRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Lỗi: Tên người dùng đã được sử dụng!"));
        }

        if (usersRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Lỗi: Email đã được sử dụng!"));
        }
        if (usersRepository.existsBySodienthoai(signUpRequest.getSodienthoai())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Lỗi: Số điện thoại đã được sử dụng!"));
        }

        // Create new user's account
        Users user = new Users(signUpRequest.getUsername(),
                encode.encode(signUpRequest.getPassword()),
                signUpRequest.getEmail(),signUpRequest.getSodienthoai()
        );
        user.setStatus(true);
        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();
        if (strRoles==null) {
            Role userRole = roleRepository.findByNamerole(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Lỗi: Quyền này không tồn tại."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByNamerole(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Lỗi: Quyền này không tồn tại."));
                        roles.add(adminRole);

                        break;
                    case "mod":
                        Role modRole = roleRepository.findByNamerole(ERole.ROLE_MODERATOR)
                                .orElseThrow(() -> new RuntimeException("Lỗi: Quyền này không tồn tại."));
                        roles.add(modRole);

                        break;
                    default:
                        Role userRole = roleRepository.findByNamerole(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Lỗi: Quyền này không tồn tại."));
                        roles.add(userRole);
                }
            });
        }

        user.setRoles(roles);
        usersRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("Đăng ký tài khoản thành công!"));
    }

    public String getAlphaNumericString(int n)
    {
        // chose a Character random from this String
        String AlphaNumericString = "0123456789";

        // create StringBuffer size of AlphaNumericString
        StringBuilder sb = new StringBuilder(n);
        for (int i = 0; i < n; i++) {
            // generate a random number between
            // 0 to AlphaNumericString variable length
            int index
                    = (int)(AlphaNumericString.length()
                    * Math.random());
            // add Character one by one in end of sb
            sb.append(AlphaNumericString
                    .charAt(index));
        }
        return sb.toString();
    }

    @PostMapping("/lostpass")
    public ResponseEntity<?> lostUser(@RequestBody SignupRequest signUpRequest) {
        Users us = userService.findUserByEmailAndSodienthoai(signUpRequest.getEmail());
        if(us!=null){
            if (signUpRequest.getEmail().equals(us.getEmail()) && us.getEmail()!=null  ) {
            us.setPassword(encode.encode("12345dhm"));
                usersRepository.save(us);
            }else {
                return ResponseEntity
                        .badRequest()
                        .body(new MessageResponse("Lỗi: Sai số điện thoại hoặc email!"));
            }
        } else {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Lỗi: không tìm thấy điện thoại hoặc email!"));
        }
        return ResponseEntity.ok(new MessageResponse("Thông tin chính xác mã otp đã được gửi về!"));
    }

//    @PostMapping("/checkotp")
//    public ResponseEntity<?> CheckotpUser(@RequestBody SignupRequest signUpRequest) {
//        Users us = userService.findUserByOtp(signUpRequest.getCodeOtp());
//        if (us != null) {
//            if (signUpRequest.getCodeOtp().equals(us.getCodeOtp())) {
//                us.setPassword(encode.encode("12345dhm"));
//                usersRepository.save(us);
//            } else {
//                return ResponseEntity
//                        .badRequest()
//                        .body(new MessageResponse("Lỗi: sai mã otp!"));
//            }
//        }
//        return ResponseEntity.ok(new MessageResponse("Thay đổi thành công!"));
//    }

}
