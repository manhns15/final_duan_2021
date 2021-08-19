import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../../service/product.service";
import {ToastrService} from "ngx-toastr";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  searchForm!: FormGroup;
  listProduct : any[] = [];
  page = 1;
  pageSize = 8;
  selectedFiles?: FileList;
  currentFile?: File;
  message = '';
  errorMsg = '';
  constructor(
    private productService: ProductService,
    private toastService: ToastrService,
    private router: Router,
    private formBuild : FormBuilder,
  ) { }
  ngOnInit(): void {
    this.getProduct();
    this.searchForm = this.formBuild.group({
      nameproduct: ['']
    });
  }
  getProduct() {
    this.productService.getAll().subscribe(res => {
      if (res) {
        this.listProduct = res;
      }
    });
  }
  get sf(): any {
    return this.searchForm.controls;
  }
  searchProduct() {
    if(this.sf.nameproduct.value) {
      this.productService.searchProduct(this.sf.nameproduct.value).subscribe(res => {
        if (res) {
          this.listProduct = res;
        }
      });
    }else{
      this.getProduct();
    }
  }
  getText(text: any) {
    if (text === 0) {
      return 'Hết hàng';
    }else {
      return 'Còn hàng';
    }
  }
  delete(item: any) {
    Swal.fire({
      title: 'Are you sure ?',
      text: 'Bạn chắc chắn muốn xóa khỏi danh sách!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Chắc chắn',
      cancelButtonText: 'Không',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(item.id).subscribe(res => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Xóa thành công !!',
            showConfirmButton: false,
            timer: 1500
          });
          this.getProduct();
        });
      } else if (result.isDismissed) {
        this.router.navigate(['/products']);
      }
    });
  }
}
