import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../../service/order.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-booms',
  templateUrl: './booms.component.html',
  styleUrls: ['./booms.component.css']
})
export class BoomsComponent implements OnInit {
  searchForm!: FormGroup;
  listBoom: any[] = [];
  constructor(
    private orderService: OrderService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      search: ['']
    });
    this.searchPhone();
  }
  getBoom() {
    this.orderService.getCountBoom().subscribe(res => {
      if (res) {
        this.listBoom = res;
      }
    });
  }
  get sf(): any {
    return this.searchForm.controls;
  }
  searchPhone() {
    if (this.sf.search.value) {
      this.orderService.getCountBoomByPhone(this.sf.search.value).subscribe(res => {
        if (res) {
          this.listBoom = res;
        }
      });
    } else {
      this.getBoom();
    }
  }
}
