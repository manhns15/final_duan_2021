package com.example.demosecurity.Controller;

import com.example.demosecurity.Config.jwt.AuthRequest;
import com.example.demosecurity.Config.jwt.AuthenticationResponse;
import com.example.demosecurity.Config.jwt.SignupRequest;
import com.example.demosecurity.Config.service.UserDetailsImpl;
import com.example.demosecurity.Repository.RoleRepository;
import com.example.demosecurity.Repository.UsersRepository;
import com.example.demosecurity.Service.auth.UserService;
import com.example.demosecurity.model.dto.CheckPass;
import com.example.demosecurity.model.dto.ERole;
import com.example.demosecurity.model.dto.MessageResponse;
import com.example.demosecurity.model.entity.Role;
import com.example.demosecurity.model.entity.Users;
import com.example.demosecurity.util.JwtUtil;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("v1/api")
public class UserController {
    @Autowired
    JwtUtil jwtUtils;

    @Autowired
    private UserService userService;
    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    BCryptPasswordEncoder encode;

    @Autowired
    AuthenticationManager authenticationManager;

    @GetMapping("/users")
    public ResponseEntity<?> findAllUser() {
        List<Users> list = userService.findAllUser();
        return new ResponseEntity<List<Users>>(list, HttpStatus.OK);
    }
    @GetMapping("/user/{id}")
    public ResponseEntity<?> findUserById(@PathVariable("id") Long id){
        Users us = userService.findUserById(id);
        return new ResponseEntity<Users>(us, HttpStatus.OK);
    }
// đây là api lấy object username đăng nhập
    @GetMapping("/user/username")
    public ResponseEntity<?> findUserUsername(Principal pc){
        Users us = userService.findUserUsername(pc.getName());
        return new ResponseEntity<Users>(us, HttpStatus.OK);
    }


    @PutMapping("user/{id}")
    public ResponseEntity<?> updateUser(@Valid @PathVariable("id") Long id, @RequestBody SignupRequest signUpRequest) {
        Users us = usersRepository.findUsersById(id);
        Users newUser = new Users();
        newUser.setId(id);
        if (signUpRequest.getUsername().equals(us.getUsername()) && us.getUsername()!=null) {
            newUser.setUsername(signUpRequest.getUsername());
        } else if (usersRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Lỗi: Tên người dùng đã được sử dụng hoặc là nó đang trống!"));
        }else{
            newUser.setUsername(signUpRequest.getUsername());
        }

        if (signUpRequest.getEmail().equals(us.getEmail()) && us.getEmail()!=null) {
            newUser.setEmail(signUpRequest.getEmail());
        } else if (usersRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Lỗi: Email đã được sử dụng hoặc là nó đang trống!"));
        }else {
            newUser.setEmail(signUpRequest.getEmail());
        }
        if (signUpRequest.getSodienthoai().equals(us.getSodienthoai()) && us.getSodienthoai()!=null) {
            newUser.setSodienthoai(signUpRequest.getSodienthoai());
        } else if (usersRepository.existsBySodienthoai(signUpRequest.getSodienthoai())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Lỗi: Số điện thoại đã được sử dụng hoặc là nó đang trống!"));
        }else{
            newUser.setSodienthoai(signUpRequest.getSodienthoai());
        }
        newUser.setCodeOtp(us.getCodeOtp());
        newUser.setPassword(us.getPassword());
        newUser.setCreateby(us.getCreateby());
        newUser.setCreatedate(us.getCreatedate());
        newUser.setImage(signUpRequest.getImage());
        newUser.setFullname(signUpRequest.getFullname());
        newUser.setSodienthoai(signUpRequest.getSodienthoai());
        newUser.setStatus(signUpRequest.getStatus());
        newUser.setAddress(signUpRequest.getAddress());
       //  Create new user's account
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

        newUser.setRoles(roles);
        usersRepository.save(newUser);
        return ResponseEntity.ok(new MessageResponse("Cập nhật tài khoản thành công!"));
    }

    @PostMapping("/user")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
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
        user.setFullname(signUpRequest.getFullname());
        user.setSodienthoai(signUpRequest.getSodienthoai());
        user.setStatus(signUpRequest.getStatus());
        user.setAddress(signUpRequest.getAddress());
        user.setImage(signUpRequest.getImage());
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


    //api check password
    @PostMapping("/changepass")
    public boolean checkPass(@RequestBody CheckPass ck, Principal pc){
        System.out.println(pc.getName());
        Users us = userService.findUserUsername(pc.getName());
        System.out.println(us.getUsername());
            boolean rest = encode.matches(ck.getCurrentPass(), us.getPassword());
        if (rest) {
            us.setPassword(encode.encode(ck.getNewPass()));
            usersRepository.save(us);
            return true;
        }
        else {
            return false;
        }
    }


}
