import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import {UserService} from "../../service/user.service";
import Swal from "sweetalert2";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private authService: AuthService,
     private tokenStorage: TokenStorageService,
     private route : Router,
    private userService: UserService,
     ) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe(
      data => {
        console.log(data);
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.userService.getUserById(data.id).subscribe(res => {
          console.log('res', res);
          if (res) {
            if (res.status == true) {
              this.reloadPage();
            } else {
              Swal.fire({
                text: 'Tài khoản của bạn đã bị khóa, vui lòng liên hệ với shop !!!',
                icon: 'error',
                confirmButtonText: 'OK',
              }).then((result) => {
                if (result.isConfirmed) {
                  this.tokenStorage.signOut();
                  this.route.navigate([""]);
                }
              });
            }
          }
        });

      },
      err => {
        console.log(err);
        this.errorMessage = "Tài khoản, mật khẩu của bạn không đúng!";
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    // window.location.reload();
    this.route.navigate([""])
  }

}
