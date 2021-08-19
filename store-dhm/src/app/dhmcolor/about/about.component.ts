import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { CartItem } from 'src/app/model/cart-item';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/service/cart.service';
import { CategoryService } from 'src/app/service/categorys.service';
import { ProductService } from 'src/app/service/product.service';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute,
      private CategoryService: CategoryService,
      private ProductService: ProductService,
      private CartService: CartService,
      private router: Router,
      private route: ActivatedRoute,
    ) { }
    listProduct: any[] = [];
    listProductCart: any = {};
    listCategory: any[] = [];
    listIdCategory: any[] = [];
    page = 1;
    pageSize = 9;
    searchProduct: any;
  ngOnInit(): void {
    this.getListCategory();
    this.getProductByIdCategory();
    this.route.paramMap.subscribe(() => {
      this.getProductByName();
    });
  }
  getListProduct() {
    this.ProductService.getAllProduct().subscribe(data => {
      this.listProduct = data;
      // data.forEach((i: any) => {
      //   const param = i.status;
      //   if (param == 1) {
      //     this.listProduct.push(i);
      //   }
      // });
    });
  }

  getListCategory() {
    this.CategoryService.getAllCategory().subscribe(dataCate => {
      this.listCategory = dataCate;
    });
  }

  getProductByIdCategory() {
    this.ProductService.getAllProduct().subscribe(dataId => {
      this.listIdCategory = dataId;
    });
  }
  getProductByName() {
    this.searchProduct = this.route.snapshot.paramMap.get('keyword');
    if (this.searchProduct) {
      this.ProductService.getProductByName(this.searchProduct).subscribe((res: any) => {
        if (res) {
          console.log("res", res);
          this.listProduct = res;
        }
      });
    } else {
      this.getListProduct();
    }
  }
}
