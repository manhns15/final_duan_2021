import { Component, OnInit } from '@angular/core';
import {AuthService} from "../service/auth.service";
import {TokenStorageService} from "../service/token-storage.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

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
    private toastService: ToastrService,
    private route: Router
  ) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }
  onSubmit() {
    const  {username, password} = this.form;
    this.authService.login(username, password).subscribe(res => {
      this.tokenStorage.saveToken(res.accessToken);
      this.tokenStorage.saveUser(res);
      this.isLoginFailed = false;
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      if (this.roles.length !== 0){
        this.roles.map(e => {
          if (e === "ROLE_ADMIN"){
            this.reloadPage();
          }else if (e === "ROLE_MODERATOR"){
            this.route.navigate(['/member']);
          }else{
            this.tokenStorage.signOut();
            window.location.reload();
          }
        });
      }else{
        this.tokenStorage.signOut();
        window.location.reload();
      }

    },err => {
      this.errorMessage = "Tài khoản, mật khẩu của bạn không đúng!";
      this.isLoginFailed = true;
    });
  }
  reloadPage(): void {
    this.route.navigate(['']);
  }
}
