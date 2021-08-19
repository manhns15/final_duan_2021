import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import {ProductService} from "../../service/product.service";
import { UploadFileService } from 'src/app/service/upload-file.service';
import {UserService} from "../../service/user.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-infor-user',
  templateUrl: './infor-user.component.html',
  styleUrls: ['./infor-user.component.css']
})
export class InforUserComponent implements OnInit {
  private roles: string[] = [];
  inforForm!: FormGroup;
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: any;
  selectedFiles?: FileList;
  currentFile?: File;
  message = '';
  errorMsg = '';
  nameFiles = null;
  id?: any;
  constructor(
    private token: TokenStorageService,
    private productService: ProductService,
    private uploadService: UploadFileService,
    private userService: UserService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.token.getToken();
    if (this.isLoggedIn) {
      const user = this.token.getUser();
      this.roles = user.roles;
      this.getUser();
    }
    this.inforForm = this.formBuilder.group({
      fullname: [''],
      email: [''],
      sdt: [''],
      addr: [''],
    });
  }
  get iF(): any {
    return this.inforForm.controls;
  }
  getUser() {
    this.userService.getInforUser().subscribe(res => {
      if (res) {
        console.log(res);
        this.id = res.id;
        this.username = res.username;
        this.nameFiles = res.image;
        this.iF.fullname.setValue(res.fullname);
        this.iF.email.setValue(res.email);
        this.iF.sdt.setValue(res.sodienthoai);
        this.iF.addr.setValue(res.address);
      }
    });
  }
  // xử lý ảnh
  onFileChanged(event: any): void {
    this.selectedFiles = event.target.files;
  }

  updateUser() {
    this.errorMsg = '';
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;
        this.uploadService.upload(this.currentFile).subscribe(
          (event: any) => {
            console.log('event', event);
            if (event.type === HttpEventType.UploadProgress) {
              console.log(Math.round(100 * event.loaded / event.total));

            } else if (event instanceof HttpResponse) {
              this.message = event.body.responseMessage;
            }
          },
          (err: any) => {
            console.log(err);

            if (err.error && err.error.responseMessage) {
              this.errorMsg = err.error.responseMessage;
            } else {
              this.errorMsg = 'Xẩy rả lỗi khi upload file có thể đã tồn tại hoặc không có !';
            }

            this.currentFile = undefined;
          });
        let param = {
          username: this.username,
          fullname: this.iF.fullname.value,
          sodienthoai: this.iF.sdt.value,
          image: this.currentFile.name,
          email: this.iF.email.value,
          address: this.iF.addr.value,
          status: 1,
        };
        this.userService.updateUser(param, this.id).subscribe(res => {
          if (res) {
            Swal.fire('Success!', 'Sửa thông tin!', 'success');
            window.location.reload();
          }
        });
      }
    }else {
      let param = {
        username: this.username,
        fullname: this.iF.fullname.value,
        sodienthoai: this.iF.sdt.value,
        image: this.nameFiles,
        email: this.iF.email.value,
        address: this.iF.addr.value,
        status: 1,
      };
      this.userService.updateUser(param, this.id).subscribe(res => {
        if (res) {
          Swal.fire('Success!', 'Sửa thông tin!', 'success');
          window.location.reload();
        }
      });
    }
  }

}
