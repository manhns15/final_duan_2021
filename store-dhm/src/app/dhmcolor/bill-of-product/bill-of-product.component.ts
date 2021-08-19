import { Component, OnInit } from '@angular/core';
import {OrderService} from '../../service/order.service';
import {TokenStorageService} from "../../service/token-storage.service";

@Component({
  selector: 'app-bill-of-product',
  templateUrl: './bill-of-product.component.html',
  styleUrls: ['./bill-of-product.component.css']
})
export class BillOfProductComponent implements OnInit {
  listOrder: any[] = [];
  productOrder: any;
  isLoggedIn = false;
  listOrderByStatus0: any[] = [];
  listOrderByStatus1: any[] = [];
  listOrderByStatus2: any[] = [];
  listOrderByStatus3: any[] = [];
  listOrderByStatus4: any[] = [];
  constructor(
    private orderService: OrderService,
    private token: TokenStorageService,
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.token.getToken();
    if (this.isLoggedIn) {
      this.getOrderByUser();
      this.getOrderUserByStatus0();
      this.getOrderUserByStatus1();
      this.getOrderUserByStatus2();
      this.getOrderUserByStatus3();
      this.getOrderUserByStatus4();
    }
  }
  getOrderByUser() {
    this.orderService.getOrderByUser().subscribe(res => {
      this.listOrder = res;
      console.log('this.listOrder', this.listOrder);
    });
  }
  getOrderUserByStatus0() {
      this.orderService.getOrderUserByStatus(0).subscribe(res => {
        if (res) {
          this.listOrderByStatus0 = res;
        }
      });
  }
  getOrderUserByStatus1() {
    this.orderService.getOrderUserByStatus(1).subscribe(res => {
      if (res) {
        this.listOrderByStatus1 = res;
      }
    });
  }
  getOrderUserByStatus2() {
    this.orderService.getOrderUserByStatus(2).subscribe(res => {
      if (res) {
        this.listOrderByStatus2 = res;
      }
    });
  }
  getOrderUserByStatus3() {
    this.orderService.getOrderUserByStatus(3).subscribe(res => {
      if (res) {
        this.listOrderByStatus3 = res;
      }
    });
  }
  getOrderUserByStatus4() {
    this.orderService.getOrderUserByStatus(4).subscribe(res => {
      if (res) {
        console.log(res);
        
        this.listOrderByStatus4 = res;
      }
    });
  }
}
