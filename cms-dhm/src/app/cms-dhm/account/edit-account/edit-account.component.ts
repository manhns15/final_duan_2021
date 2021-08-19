import { Component, OnInit } from '@angular/core';
import {SizeService} from "../../../service/size.service";
import {ColorService} from "../../../service/color.service";
import {CategoryService} from "../../../service/categorys.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../../service/product.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../service/user.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent implements OnInit {
  inputForm! : FormGroup;
  userDetail: any[] = [];
  constructor(
    private formBuild: FormBuilder,
    private toastService: ToastrService,
    private activateRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUserById();
    this.inputForm = this.formBuild.group({
      username: ['', [Validators.required]],
      sodienthoai: ['', [Validators.required, Validators.pattern('(09|03|01[2|6|8|9])+([0-9]{8})\\b')]],
      email: ['', [Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')]],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]],
      status: [1],
    });
  }
  get iF(): any {
    return this.inputForm.controls;
  }

  getUserById() {
    this.activateRoute.paramMap.subscribe(params => {
      let userId = params.get('id');
      this.userService.findUserById(userId).subscribe(data => {
        this.userDetail = data;
        this.iF.username.setValue(data.username);
        this.iF.sodienthoai.setValue(data.sodienthoai);
        this.iF.email.setValue(data.email);
        this.iF.status.setValue(data.status);
        data.roles.map( (e: any) => {
          this.iF.role.setValue('mod');
        });
      });
    });
  }
  update() {
    this.activateRoute.paramMap.subscribe(params => {
      let userId = params.get('id');
      let param = {
        id: userId,
        username: this.iF.username.value,
        sodienthoai: this.iF.sodienthoai.value,
        email: this.iF.email.value,
        role: [this.iF.role.value],
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
          this.router.navigate(['/accounts']);
        }
      });
    });
  }
  cancel() {
    this.router.navigate(['/accounts']);
  }
}
