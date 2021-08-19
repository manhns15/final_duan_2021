import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../service/order.service";
import {ActivatedRoute} from "@angular/router";
import {Subject} from "rxjs";

@Component({
  selector: 'app-detail-bills',
  templateUrl: './detail-bills.component.html',
  styleUrls: ['./detail-bills.component.css']
})
export class DetailBillsComponent implements OnInit {
  listOrder: any[] = [];
  listOrderBySku: any[] = [];
  sku: any;
  nameuser: any;
  sdt: any;
  email: any;
  addr: any;
  paymentmethod: any;
  totalPriceAll: Subject<number> = new Subject<number>();
  totalQty: Subject<number> = new Subject<number>();
  totalPrice: any;
  thanhtoan: any;
  constructor(
    private orderService: OrderService,
    private activeRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getOrderUser();
    this.totalPriceAll.subscribe(data => {
      this.totalPrice = ((data / 10) + data);
    });
  }
  getOrderUser() {
    this.activeRoute.paramMap.subscribe(param => {
      let sku = param.get('sku');
      this.orderService.getOrderBySku(sku).subscribe(res => {
        this.sku = res.sku;
        this.nameuser = res.namecustom;
        this.email = res.email;
        this.sdt = res.phone;
        this.addr = res.address;
        this.paymentmethod = res.paymentmethod;
        this.listOrderBySku = res.orderProductDetails;
        console.log(this.listOrderBySku);
        console.log(res);
        this.CartTotal();
      });
    });
  }
  CartTotal() {
    let totalPriceValue = 0;
    let totalQtyValue = 0;
    if (this.listOrderBySku) {
      for (const item of this.listOrderBySku) {
        totalPriceValue += item.quantity * item.productDetail.product.priceProduct;
        totalQtyValue += item.quantity;
      }
      this.totalQty.next(totalQtyValue);
      this.totalPriceAll.next(totalPriceValue);
    }
  }
}
