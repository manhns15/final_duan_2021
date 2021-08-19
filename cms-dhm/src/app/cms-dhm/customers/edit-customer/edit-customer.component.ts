import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import Swal from "sweetalert2";

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  inputForm!: FormGroup;
  userDetail: any[] = [];
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.inputForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      status: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')]],
      phone: ['', [Validators.required, Validators.pattern('(09|03|01[2|6|8|9])+([0-9]{8})\\b')]],
    });
    this.getUserById();
  }
  get iF(): any {
    return this.inputForm.controls;
  }
  getUserById() {
    this.activateRoute.paramMap.subscribe(params => {
      let userId = params.get('id');
      this.userService.findUserById(userId).subscribe(data => {
        console.log(data);
        this.userDetail = data;
        this.iF.username.setValue(data.username);
        this.iF.phone.setValue(data.sodienthoai);
        this.iF.email.setValue(data.email);
        this.iF.status.setValue(data.status);
      });
    });
  }
  update() {
    if (this.inputForm.invalid) {
      this.toastService.error("Vui lòng nhập đầy đủ thông tin!!!");
      return;
    }
    this.activateRoute.paramMap.subscribe(params => {
      let userId = params.get('id');
      let param = {
        id: userId,
        username: this.iF.username.value,
        sodienthoai: this.iF.phone.value,
        email: this.iF.email.value,
        status: this.iF.status.value,
      };
      this.userService.update(param, userId).subscribe(res => {
        if (res){
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Sửa thành công !!',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/customer']);
        }
      });
    });
  }
  cancel() {
    this.router.navigate(['/customer']);
  }
}
