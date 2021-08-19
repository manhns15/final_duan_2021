import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent implements OnInit {
  changeForm!: FormGroup;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.changeForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      // newPassword1: ['', [Validators.required]],
    });
  }
  get cf(): any {
    return this.changeForm.controls;
  }

  changePass() {
    if (this.changeForm.invalid) {
      this.toastService.error("Vui lòng nhập đầy đủ thông tin để đổi mật khẩu!");
      return;
    }
    let param = {
      currentPass: this.cf.oldPassword.value,
      newPass: this.cf.newPassword.value,
    };
    this.userService.changePassword(param).subscribe(res => {
      if (res == true) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Đổi mật khẩu thành công!',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigateByUrl('');
      }else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Đổi mật khẩu thất bại!',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }
}
