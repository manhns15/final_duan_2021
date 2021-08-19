import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../service/order.service";

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {
  listDataSuccess: any[] = [];
  constructor(
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.orderService.getOrderUser().subscribe(res => {
      if (res) {
        console.log(res);
        this.listDataSuccess = res;
      }
    });
  }
}
