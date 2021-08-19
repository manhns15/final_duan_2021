import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../service/auth.service";
import {ToastrService} from "ngx-toastr";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuild : FormBuilder,
    private router: Router,
    private toastService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuild.group({
      username: ['', [Validators.required]],
      sodienthoai: ['', [Validators.required, Validators.pattern('(09|03|01[2|6|8|9])+([0-9]{8})\\b')]],
      email: ['', [Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')]],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]],
      status: [1],
    });
  }
  get iF(): any {
    return this.registerForm.controls;
  }
  onAdd() {
    if (this.registerForm.invalid) {
      this.toastService.error("Vui lòng nhập đầy đủ thông tin !!!");
      return;
    }
    let obj = {
      username: this.iF.username.value,
      sodienthoai: this.iF.sodienthoai.value,
      email: this.iF.email.value,
      password: this.iF.password.value,
      role: [this.iF.role.value],
      status: this.iF.status.value,
    };
    this.authService.register(obj).subscribe(res => {
      if (res) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Thêm nhân viên thành công !!!',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/accounts']);
      }
    });
  }
  cancel() {
    this.router.navigate(['/accounts']);
  }
}
