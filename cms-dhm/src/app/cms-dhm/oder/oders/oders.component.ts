import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../../service/order.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-oders',
  templateUrl: './oders.component.html',
  styleUrls: ['./oders.component.css'],

})
export class OdersComponent implements OnInit {
  searchForm!: FormGroup;
  listOrder: any[] = [];
  page = 1;
  pageSize = 8;
  countBoom: any;
  phone: any;
  constructor(
    private orderService: OrderService,
    private formBuild: FormBuilder,
  ) {}

  ngOnInit() {
    this.searchForm = this.formBuild.group({
      search: [''],
      status: ['']
    });
    this.searchSku();
  }
  getAll() {
    this.orderService.getAll().subscribe(res => {
      if (res) {
        this.listOrder = res;
        console.log(res);
        this.getBoom();
      }
    });
  }
  get sf(): any {
    return this.searchForm.controls;
  }
  getOrderByStatus(event: any) {
    if (this.sf.status.value) {
      this.orderService.getOrderByStatus(this.sf.status.value).subscribe(res => {
        if (res){
          this.listOrder = res;
          console.log(res);
        }
      });
    }else{
      this.getAll();
    }
  }
  searchSku() {
    if (this.sf.search.value) {
      this.orderService.getOrderBySku(this.sf.search.value).subscribe(res => {
        if (res) {
          this.listOrder = [res];
          this.getBoom();
        }
      });
    } else {
      this.getAll();
    }
  }
  getBoom() {
    this.listOrder.forEach(i => {
      this.orderService.getCountBoomByPhone(i.phone).subscribe(res => {
        if (res) {
          let data = res;
          data.forEach((el: any) => {
            i.boom = el.boom;
            console.log(i.boom);
          });
        }
      });
    });
  }
}
