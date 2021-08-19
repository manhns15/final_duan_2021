import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  regisForm!: FormGroup;
  constructor(
    private formBuild: FormBuilder,
    private authService: AuthService,
    private toastService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.regisForm = this.formBuild.group({
      email: ['', [Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')]],
      username: ['', [Validators.required]],
      sodienthoai: ['', [Validators.required, Validators.pattern('(09|03|01[2|6|8|9])+([0-9]{8})\\b')]],
      password: ['', [Validators.required]],
    });
  }
  get rf(): any {
    return this.regisForm.controls;
  }
  register() {
    if (this.regisForm.invalid) {
      this.toastService.error('Vui lòng nhập đầy đủ thông tin để đăng ký hoặc email, số điện thoại không đúng định dạng!');
      return;
    }
    let obj = {
      email: this.rf.email.value,
      username: this.rf.username.value,
      sodienthoai: this.rf.sodienthoai.value,
      password: this.rf.password.value,
      role: [''],
    };
    this.authService.register(obj).subscribe((res) => {
      if (res) {
        this.toastService.success('Đãng ký tài khoản thành công');
        this.router.navigate(['login']);
      }
    },
    (error) => {
      this.toastService.error(error);
    }
    );
  }
}
