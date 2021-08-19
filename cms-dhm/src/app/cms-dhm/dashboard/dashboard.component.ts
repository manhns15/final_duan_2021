import { Component, OnInit } from '@angular/core';
import * as moment from "moment";
import {FormBuilder, FormGroup} from "@angular/forms";
import {StatisticalService} from "../../service/statistical.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  searchForm!: FormGroup;
  maxDate = moment();
  totalProduct: any;
  totalOrder: any;
  statusAccept: any;
  statusGetProduct: any;
  statusDelivery: any;
  statusSucces: any;
  statusCancel: any;
  totalmoneyCancle: any;
  totalmoney: any;
  constructor(
    private formBuilder: FormBuilder,
    private statisticalService: StatisticalService,
  ) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      dateRange: [{startDate: moment().startOf('month'), endDate: moment().endOf('month')}],
    });
    this.getDataStatistical();
  }
  get f() {
    return this.searchForm.controls;
  }
  dateChanged(event: any) {
    const start = event.startDate;
    const end = event.endDate;
    if (!start.isValid() || !end.isValid()) {
      this.f.dateRange.setValue(this.f.dateRange.value);
    } else {
      this.f.dateRange.setValue({startDate: start, endDate : end});
    }
    this.getDataStatisticalByDate();
    console.log(this.f.dateRange.value.startDate.format('DD-MM-YYYY'), this.f.dateRange.value.endDate.format('DD-MM-YYYY'));
  }
  getDataStatistical() {
    this.statisticalService.getAllData().subscribe(res => {
      if (res) {
        this.totalProduct = res.totalProduct;
        this.totalOrder = res.totalOrder;
        this.statusAccept = res.statusAccept;
        this.statusGetProduct = res.statusGetProduct;
        this.statusDelivery = res.statusDelivery;
        this.statusSucces = res.statusSucces;
        this.statusCancel = res.statusCancel;
        this.totalmoneyCancle = res.totalmoneyCancle;
        this.totalmoney = res.totalmoney;
      }
    });
  }
  getDataStatisticalByDate() {
    let obj = {
      periodTime : this.f.dateRange.value.startDate.format('DD/MM/YYYY'),
      curnentTime : this.f.dateRange.value.endDate.format('DD/MM/YYYY')
    };
    this.statisticalService.getAllByDate(obj).subscribe(res => {
      if (res) {
          this.totalProduct = res.totalProduct;
          this.totalOrder = res.totalOrder;
          this.statusAccept = res.statusAccept;
          this.statusGetProduct = res.statusGetProduct;
          this.statusDelivery = res.statusDelivery;
          this.statusSucces = res.statusSucces;
          this.statusCancel = res.statusCancel;
          this.totalmoneyCancle = res.totalmoneyCancle;
          this.totalmoney = res.totalmoney;
      }
    });
  }
  ranges() {
    return {
      '7 ngày trước': [moment().subtract(7, 'days'), moment()],
      '14 ngày trước': [moment().subtract(14, 'days'), moment()],
      '30 ngày trước': [moment().subtract(30, 'days'), moment()],
      'Tháng này': [moment().startOf('month'), moment().endOf('month')],
      'Tháng trước': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
    };
  }
}
