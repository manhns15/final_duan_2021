import { Component, OnInit } from '@angular/core';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from '../../../service/order.service';
import {Subject} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {ProductService} from '../../../service/product.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-detail-oder',
  templateUrl: './detail-oder.component.html',
  styleUrls: ['./detail-oder.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class DetailOderComponent implements OnInit {
  inputForm!: FormGroup;
  searchForm!: FormGroup;
  statusForm!: FormGroup;
  listOrderBySku: any[] = [];
  listOrderSearch: any[] = [];
  listOrderDetail: any[] = [];
  idUser: any;
  sku: any;
  nameuser: any;
  sdt: any;
  email: any;
  addr: any;
  status: any;
  paymentmethod: any;
  totalPriceAll: Subject<number> = new Subject<number>();
  totalQty: Subject<number> = new Subject<number>();
  totalPrice: any;
  thanhtoan: any;
  coc: any;
  reason: any;
  idOrders!: number;
  statusCheck: any;
  statusCheck1: any;
  statusCheck2: any;
  statusCheck3: any;
  statusCheck4: any;
  constructor(
    private activeRoute: ActivatedRoute,
    private orderService: OrderService,
    private formBuilder: FormBuilder,
    private toastService: ToastrService,
    private productService: ProductService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      sku: ['']
    });
    this.statusForm = this.formBuilder.group({
      statusSelect: [0],
      reason: [],
    });
    this.getOrderBySku();
    this.totalPriceAll.subscribe(data => {
      this.totalPrice = ((data / 10) + data);
    });
    this.coc = 0;
  }
  get if(): any {
    return this.inputForm.controls;
  }
  get sf(): any {
    return this.searchForm.controls;
  }
  get st(): any {
    return this.statusForm.controls;
  }
  // tslint:disable-next-line:typedef
  modelchange(event: any){
    this.coc = event;
    console.log(this.totalPrice - event);
  }
  getOrderBySku() {
    this.activeRoute.paramMap.subscribe(param => {
      const sku = param.get('sku');
      this.orderService.getOrderBySku(sku).subscribe(res => {
        console.log('res1', res);
        this.idOrders = res.id;
        this.idUser = res.id;
        this.sku = res.sku;
        this.nameuser = res.namecustom;
        this.email = res.email;
        this.sdt = res.phone;
        this.addr = res.address;
        this.status = res.status;
        this.reason = res.reason;
        this.paymentmethod = res.paymentmethod;
        this.listOrderBySku = res.orderProductDetails;
        this.st.statusSelect.setValue(this.status);
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
  searchProductBySku() {
    if (this.searchForm.invalid){
      this.toastService.error('Vui lòng nhập mã để tìm kiếm');
      return;
    }
    this.productService.getProductBySku(this.sf.sku.value).subscribe(res => {
      if (res) {
        console.log(res);
        const obj = {
            id: {
              idOrder: this.idOrders,
              idProductDetail: res.id,
            },
            productDetail: res,
            quantity: res.priceProductDetail,
            price: res.product.priceProduct,
            status: res.status
        };
        this.listOrderBySku.push(obj);
        console.log('this.listOrderBySku', this.listOrderBySku);
        this.CartTotal();
      }
    });
  }
  tangsoluong(theCartItem: any) {
    this.addQuantity(theCartItem, this.listOrderBySku);
    this.CartTotal();
  }
  incrementQuantity(theCartItem: any) {
    this.decrementQuantity(theCartItem, this.listOrderBySku);
    this.CartTotal();
  }
  addQuantity(theCartItem: any, arr: any) {
    if (arr.length > 0){
      arr.map((e: any) => {
        if (e.id === theCartItem.id){
          // tslint:disable-next-line:no-unused-expression label-position
          quantity : theCartItem.quantity++;
        }
      });
    }
  }
  decrementQuantity(theCartItem: any, arr: any) {
    if (arr.length > 0){
      arr.map((e: any) => {
        if (e.id === theCartItem.id){
          // tslint:disable-next-line:no-unused-expression label-position
          quantity : theCartItem.quantity--;
        }
      });
    }
  }
  update() {
    this.listOrderBySku.forEach(i => {
      this.listOrderDetail = i.productDetail;
    });
    let param = {
      id: this.idOrders,
      namecustom: this.nameuser,
      email: this.email,
      phone: this.sdt,
      address: this.addr,
      status: this.st.statusSelect.value,
      productDetailList: [this.listOrderDetail],
      paymentmethod: this.paymentmethod,
      deposit: this.coc,
      totalMonenyOrder: this.totalPrice - this.coc,
      reason: 1,
      sku: this.sku,
    };
    this.orderService.updateOrder(param, this.idOrders).subscribe(res => {
      if (res) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Sửa thành công !!',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/oders']);
      }
    });
  }
  cancel() {
    this.router.navigate(['/oders']);
  }
}