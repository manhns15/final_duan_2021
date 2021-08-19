import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {OrderService} from "../../service/order.service";


@Component({
  selector: 'app-detail-bill',
  templateUrl: './detail-bill.component.html',
  styleUrls: ['./detail-bill.component.css']
})
export class DetailBillComponent implements OnInit {
  listOrderBySku: any[] = [];
  productOrder: any;
  totalOrder: any;
  skuOrder: any;
  user: any;
  addr: any;
  phone: any;

  constructor(
    private activeRoute: ActivatedRoute,
    private orderService: OrderService
  ) {
  }

  ngOnInit(): void {
    this.getOrderBySku();
  }

  getOrderBySku() {
    this.activeRoute.paramMap.subscribe(param => {
      let sku = param.get('sku');
      this.orderService.getOrderBySku(sku).subscribe(res => {
        if (res) {
          console.log(res);
          this.totalOrder = res.totalMonenyOrder;
          this.skuOrder = res.sku;
          this.user = res.namecustom;
          this.addr = res.address;
          this.phone = res.phone;
          const data = res.orderProductDetails;
          data.map((el: any) => {
            this.productOrder = el;
            this.listOrderBySku.push(this.productOrder);
            console.log(this.listOrderBySku);
          });
        }
      });
    });
  }
}
