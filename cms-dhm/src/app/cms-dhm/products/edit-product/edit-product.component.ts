import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProductService } from "../../../service/product.service";
import { ToastrService } from "ngx-toastr";
import { SizeService } from "../../../service/size.service";
import { CategoryService } from "../../../service/categorys.service";
import { ColorService } from "../../../service/color.service";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";
import { UploadFileServiceService } from 'src/app/service/upload-file-service.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  inputForm!: FormGroup;
  listSize: any[] = [];
  listCategory: any[] = [];
  listColor: any[] = [];
  listColorSize: any[] = [];
  productDetail: any = [];
  product: any[] = [];
  idcolor: any;
  idsize: any;
  selectedFiles?: FileList;
  currentFile?: File;
  message = '';
  errorMsg = '';
  nameFiles = null;
  constructor(
    private sizeService: SizeService,
    private colorService: ColorService,
    private categoryService: CategoryService,
    private formBuild: FormBuilder,
    private productService: ProductService,
    private toastService: ToastrService,
    private uploadService: UploadFileServiceService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.getProductById();
    this.getSize();
    this.getColor();
    this.getCategory();
    this.inputForm = this.formBuild.group({
      statussize: [1],

      nameproduct: ['', [Validators.required]],
      image: [''],
      priceProduct: ['', [Validators.required]],
      decription: ['', [Validators.required]],
      quantityProduct: [''],
      idcolor: [''],
      idsize: [''],
      status: [1],
      idcategory: ['']
    });
  }
  getSize() {
    this.sizeService.getAll().subscribe(res => {
      if (res) {
        this.listSize = res;
      }
    });
  }
  getColor() {
    this.colorService.getAll().subscribe(res => {
      if (res) {
        this.listColor = res;
      }
    });
  }
  getCategory() {
    this.categoryService.getAll().subscribe(res => {
      if (res) {
        this.listCategory = res;
      }
    });
  }
  get iF(): any {
    return this.inputForm.controls;
  }
  xoa(items: any) {
    Swal.fire({
      text: 'Bạn chắc chắn muốn xóa chi tiết khỏi danh sách!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Chắc chắn',
      cancelButtonText: 'Không',
    }).then((result) => {
      if (result.isConfirmed) {
        this.listColorSize = this.listColorSize.filter((i) => i !== items);
      }
    });
  }
  addColor() {
    if (this.iF.idcolor.value == "") {
      this.toastService.error("Vui lòng chọn size !!");
      return;
    }
    if (this.iF.idsize.value == "") {
      this.toastService.error("Vui lòng chọn màu !!");
      return;
    }
    if (this.iF.quantityProduct.value == "") {
      this.toastService.error("Vui lòng chọn số lượng !!");
      return;
    }
    let params = {
      idcolor: this.iF.idcolor.value,
      idsize: this.iF.idsize.value,
      quantityProduct: this.iF.quantityProduct.value,
    };
    this.listColorSize.push(params);
  }
  getProductById() {
    this.activateRoute.paramMap.subscribe(params => {
      let productId = params.get('id');
      this.productService.getProductByIdProduct(productId).subscribe(res => {
        console.log('res', res);
        this.nameFiles = res.image;
        this.product = res;
        this.iF.idcategory.setValue(res.category.id);
      });
      this.productService.getProductByIdDetail(productId).subscribe(data => {

        this.productDetail = data;
        this.productDetail.forEach((i: any) => {
          let obj = {
            idcolor: i.color.id, idsize: i.size.id, quantityProduct: i.quantityProduct
          };
          this.listColorSize.push(obj);
        });
        console.log('data', data);
        this.iF.statussize.setValue(data[0].size.status);
        this.iF.nameproduct.setValue(data[0].product.nameproduct);
        this.iF.priceProduct.setValue(data[0].product.priceProduct);
        this.iF.decription.setValue(data[0].product.decription);
        this.iF.status.setValue(data[0].product.status);
      });
    });
  }

  // xử lý ảnh
  onFileChanged(event: any): void {
    this.selectedFiles = event.target.files;
  }

  update() {
    if (this.inputForm.invalid) {
      this.toastService.error("Vui lòng nhập đầy đủ thông tin !!!");
      return;
    }
    this.activateRoute.paramMap.subscribe(params => {
      let productId = params.get('id');
      this.errorMsg = '';
      if (this.selectedFiles) {
        const file: File | null = this.selectedFiles.item(0);
        if (file) {
          this.currentFile = file;
          this.uploadService.upload(this.currentFile).subscribe(
            (event: any) => {
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
            const obj = {
              id: productId,
              idcategory: this.iF.idcategory.value,
              nameproduct: this.iF.nameproduct.value,
              priceProduct: this.iF.priceProduct.value,
              image: this.currentFile.name,
              decription: this.iF.decription.value,
              productDetails: this.listColorSize,
              status: this.iF.status.value ? 1 : 0,
            };
            this.productService.updateProduct(obj, productId).subscribe(res => {
              if (res) {
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Sửa thành công !!',
                  showConfirmButton: false,
                  timer: 1500
                });
                this.router.navigate(['/products']);
              }
            });
        }
      } else {
        const obj = {
          id: productId,
          idcategory: this.iF.idcategory.value,
          nameproduct: this.iF.nameproduct.value,
          priceProduct: this.iF.priceProduct.value,
          image: this.nameFiles,
          decription: this.iF.decription.value,
          productDetails: this.listColorSize,
          status: this.iF.status.value ? 1 : 0,
        };
        this.productService.updateProduct(obj, productId).subscribe(res => {
          if (res) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Sửa thành công!!',
              showConfirmButton: false,
              timer: 1500
            });
            this.router.navigate(['/products']);
          }
        });
      }
    });
}
  cancel() {
    this.router.navigate(['/products']);
  }
}
