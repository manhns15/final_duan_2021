import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from 'src/app/model/cart-item';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';
import Swal from "sweetalert2";
import {TokenStorageService} from "../../service/token-storage.service";
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  products: Product[] = [];
  isLoggedIn = false;
  productDetail: any = [];
  listProduct: any[] = [];
  colorSizeDetail: any[] = [];
  sizeSelect: any;
  detailProduct: any;
  sku: any;

  constructor(
    private ProductService: ProductService,
    private CartService: CartService,
    private route: ActivatedRoute,
    private activateRoute: ActivatedRoute,
    public toastService: ToastrService,
    private token: TokenStorageService,
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.token.getToken();
    this.getProductDetail();
    this.getListAllProduct();
  }
  selectSize(iz: any) {
    this.sizeSelect = iz.size.namesize;
    this.detailProduct = iz;
    this.sku = iz.sku;
    console.log("chọn size",iz);
  }
  getProductDetail() {
    this.activateRoute.paramMap.subscribe(params => {
      let productId = params.get('id');
      this.ProductService.getProductById(productId).subscribe(data => {
        this.colorSizeDetail = data;
        this.productDetail = data[0].product;
        console.log(this.productDetail);
      });
    });
  }
  getListAllProduct() {
    this.ProductService.getAllProduct().subscribe(data => {
      this.listProduct = data;
    });
  }
   kiemtravitri( list: any, obj: CartItem) {
    for (let i = 0 ; i < list.length; i++){
      if (list[i].id === obj.id && list[i].size.id === obj.size.id)
      {
        return i;
      }
    }
    return -1;
  }
  addToCart() {
    if (this.isLoggedIn) {
      if (this.sizeSelect == null) {
        this.toastService.error("Vui lòng chọn size!");
        return;
      }
      const listDataCart = JSON.parse(localStorage.getItem("Cart")!);
      Swal.fire({
        text: 'Bạn có muốn thêm sản phẩm này vào giỏ hàng không?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Có',
        cancelButtonText: 'Không',
      }).then((result) => {
        if (result.isConfirmed) {
          if (listDataCart === null) {
            this.ProductService.addCartLogin(this.detailProduct).subscribe(res => {
              if (res) {
                console.log('giỏ hàng', res);
              }
            });
            this.CartService.addCart(this.detailProduct, listDataCart);
            Swal.fire({
              text: 'Thêm sản phẩm vào giỏ hàng thành công!',
              icon: 'success',
              confirmButtonText: 'OK',
            }).then(( result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          }else {
            const i = this.kiemtravitri(listDataCart, this.detailProduct);
            if (i === -1){
              this.ProductService.addCartLogin(this.detailProduct).subscribe(res => {
                if (res) {
                  console.log('giỏ hàng', res);
                }
              });
              this.CartService.addCart(this.detailProduct, listDataCart);
              Swal.fire({
                text: 'Thêm sản phẩm vào giỏ hàng thành công!',
                icon: 'success',
                confirmButtonText: 'OK',
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                }
              });
            }else {
              listDataCart.map((e: any) => {
                if (e.id === listDataCart[i].id){
                  // tslint:disable-next-line:no-unused-expression label-position
                  priceProductDetail : listDataCart[i].priceProductDetail++;
                }
              });
              localStorage.setItem("Cart", JSON.stringify(listDataCart));
              Swal.fire({
                text: 'Thêm sản phẩm vào giỏ hàng thành công!',
                icon: 'success',
                confirmButtonText: 'OK',
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                }
              });
            }
          }
        } else if (result.isDismissed) {
          window.location.reload();
        }
      });
    } else {
      if (this.sizeSelect == null) {
        this.toastService.error("Vui lòng chọn size!");
        return;
      }
      const listDataCart = JSON.parse(localStorage.getItem("Cart")!);
      Swal.fire({
        text: 'Bạn có muốn thêm sản phẩm này vào giỏ hàng không?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Có',
        cancelButtonText: 'Không',
      }).then((result) => {
        if (result.isConfirmed) {
          if (listDataCart === null) {
            this.CartService.addCart(this.detailProduct,listDataCart);
            Swal.fire({
              text: 'Thêm sản phẩm vào giỏ hàng thành công!',
              icon: 'success',
              confirmButtonText: 'OK',
            }).then(( result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          }else {
            const i = this.kiemtravitri(listDataCart, this.detailProduct);
            if (i === -1){
              this.CartService.addCart(this.detailProduct, listDataCart);
              Swal.fire({
                text: 'Thêm sản phẩm vào giỏ hàng thành công!',
                icon: 'success',
                confirmButtonText: 'OK',
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                }
              });
            }else {
              listDataCart.map((e: any) => {
                if (e.id === listDataCart[i].id){
                  // tslint:disable-next-line:no-unused-expression label-position
                  priceProductDetail : listDataCart[i].priceProductDetail++;
                }
              });
              localStorage.setItem("Cart", JSON.stringify(listDataCart));
              Swal.fire({
                text: 'Thêm sản phẩm vào giỏ hàng thành công!',
                icon: 'success',
                confirmButtonText: 'OK',
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                }
              });
            }
          }
        } else if (result.isDismissed) {
          window.location.reload();
        }
      });
    }
  }
}
