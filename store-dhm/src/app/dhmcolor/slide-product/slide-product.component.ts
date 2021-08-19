import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../service/product.service';

@Component({
  selector: 'app-slide-product',
  templateUrl: './slide-product.component.html',
  styleUrls: ['./slide-product.component.css']
})
export class SlideProductComponent implements OnInit {
  listProduct: any[] = [];
  listProductDetail:any[]=[];
  constructor(private ProductService: ProductService) { }

  ngOnInit(): void {
    this.getListAllProduct();
  }
  getListProductDetail() {
    this.ProductService.getAll().subscribe(data => {
      this.listProductDetail = data;
    });
  }
  getListAllProduct() {
    this.ProductService.getAllProduct().subscribe(data => {
        this.listProduct = data;
    });
  }
}
