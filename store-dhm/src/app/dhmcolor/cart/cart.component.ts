import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartItem } from 'src/app/model/cart-item';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';
import {ToastrService} from 'ngx-toastr';
import {OrderService} from '../../service/order.service';
import {TokenStorageService} from "../../service/token-storage.service";
import {AuthService} from "../../service/auth.service";
import Swal from "sweetalert2";
import {UserService} from "../../service/user.service";
declare var $: any;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  inputForm!: FormGroup;
  listProduct: any[] = [];
  listDataCart: any[] = [];
  type = 0;
  cartItem: CartItem[] = [];
  totalPrice = 0;
  totalQty = 0;
  isLoggedIn = false;
  id?: string;
  city: any[] = [];

  constructor(
    private activeRoute: ActivatedRoute,
    private ProductService: ProductService,
    private cartService: CartService,
    public formBuilder: FormBuilder,
    private modalService: NgbModal,
    public toastService: ToastrService,
    public OrderService: OrderService,
    private token: TokenStorageService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.city = [{id: 1, name: 'An Giang'}, {id: 2, name: 'Bà Rịa - Vũng Tàu'}, {id: 3, name: 'Bắc Giang'}, {id: 4, name: 'Bắc Kạn'}, {id: 5, name: 'Bạc Liêu'}
      , {id: 6, name: 'Bắc Ninh'}, {id: 7, name: 'Bến Tre'}, {id: 8, name: 'Bình Định'}, {id: 9, name: 'Bình Dương'}, {id: 10, name: 'Bình Phước'}, {id: 11, name: 'Bình Thuận'}, {id: 12, name: 'Cà Mau'}, {id: 13, name: 'Cần Thơ'}
      , {id: 14, name: 'Cao Bằng'}, {id: 15, name: 'Đà Nẵng'}, {id: 16, name: 'Đắk Lắk'}, {id: 17, name: 'Đắk Nông'}, {id: 18, name: 'Điện Biên'}, {id: 19, name: 'Đồng Nai'}, {id: 20, name: 'Đồng Tháp'}, {id: 21, name: 'Gia Lai'}
      , {id: 22, name: 'Hà Giang'}, {id: 23, name: 'Hà Nam'}, {id: 24, name: 'Hà Nội'}, {id: 25, name: 'Hà Tĩnh'}, {id: 26, name: 'Hải Dương'}, {id: 27, name: 'Hải Phòng'}, {id: 28, name: 'Hậu Giang'}, {id: 29, name: 'Hòa Bình'}
      , {id: 30, name: 'Hưng Yên'}, {id: 31, name: 'Khánh Hòa'}, {id: 32, name: 'Kiên Giang'}, {id: 33, name: 'Kon Tum'}, {id: 34, name: 'Lai Châu'}, {id: 35, name: 'Lâm Đồng'}, {id: 36, name: 'Lạng Sơn'}, {id: 37, name: 'Lào Cai'}
      , {id: 38, name: 'Long An'}, {id: 39, name: 'Nam Định'}, {id: 40, name: 'Nghệ An'}, {id: 41, name: 'Ninh Bình'}, {id: 42, name: 'Ninh Thuận'}, {id: 43, name: 'Phú Thọ'}, {id: 44, name: 'Phú Yên'}, {id: 45, name: 'Quảng Bình'}
      , {id: 46, name: 'Quảng Nam'}, {id: 47, name: 'Quảng Ngãi'}, {id: 48, name: 'Quảng Ninh'}, {id: 49, name: 'Quảng Trị'}, {id: 50, name: 'Sóc Trăng'}, {id: 51, name: 'Sơn La'}, {id: 52, name: 'Tây Ninh'}, {id: 53, name: 'Thái Bình'}
      , {id: 54, name: 'Thái Nguyên'}, {id: 55, name: 'Thanh Hóa'}, {id: 56, name: 'Thừa Thiên Huế'}, {id: 57, name: 'Tiền Giang'}, {id: 58, name: 'Thành phố Hồ Chí Minh'}, {id: 59, name: 'Trà Vinh'}, {id: 60, name: 'Tuyên Quang'}, {id: 61, name: 'Vĩnh Long'}
      , {id: 62, name: 'Vĩnh Phúc'}, {id: 63, name: 'Yên Bái'}];
    this.listCartProduct();
    this.inputForm = this.formBuilder.group({
      hoten: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'), Validators.minLength(2), Validators.maxLength(50)]],
      addr: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      phone: ['', [Validators.required, Validators.pattern('(09|03|01[2|6|8|9])+([0-9]{8})\\b')]],
      citys: ['', [Validators.required]],
      type: [],
    });
    this.isLoggedIn = !!this.token.getToken();
    if (this.isLoggedIn) {
      const user = this.token.getUser();
      this.id = user.id;
      this.getInforUser();
    }
  }
  listCartProduct() {
    // this.cartItem = this.cartService.cartItems;
    this.listDataCart = JSON.parse(localStorage.getItem('Cart')!);
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );
    this.cartService.totalQty.subscribe(
      data => this.totalQty = data
    );
    if (this.listDataCart){
      this.cartService.CartTotal();
    }
  }
  get iF(): any {
    return this.inputForm.controls;
  }
  // tang so luong
  incrementQuantity(theCartItem: any) {
    // this.cartService.addCart(theCartItem);
    this.cartService.addQuantity(theCartItem, this.listDataCart);
    this.cartService.CartTotal();
  }
  // giam so luong
  decrementQuantity(theCartItem: any) {
    this.cartService.decrementQuantity(theCartItem, this.listDataCart);
    this.cartService.CartTotal();
  }

  delete(item: any) {
    Swal.fire({
      text: 'Bạn có chắc chắn muốn xóa sản phẩm này không ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Chắc chắn',
      cancelButtonText: 'Không',
    }).then((result) => {
      if (result.isConfirmed) {
        this.listDataCart = this.listDataCart.filter((i) => i !== item);
        localStorage.setItem('Cart', JSON.stringify(this.listDataCart));
        Swal.fire('Success!', 'Sửa thông tin!', 'success');
      } else if (result.isDismissed) {
        window.location.reload();
      }
    });
  }

  buyNow() {
    if (this.inputForm.invalid) {
      console.log('this.inputForm',this.inputForm);
      this.toastService.error('Vui lòng điền đẩy đủ thông tin');
      return;
    }
    const obj = {
      idUser: this.id,
      namecustom: this.iF.hoten.value,
      email: this.iF.email.value,
      address: this.iF.addr.value + ' - ' + this.iF.citys.value,
      phone: this.iF.phone.value,
      paymentmethod: this.iF.type.value,
      productDetailList: this.listDataCart,
      status: 0,
      totalMonenyOrder: (this.totalPrice / 10) + this.totalPrice,
    };
        Swal.fire({
          text: 'Bạn đã đọc kĩ điều khoản của cửa hàng chưa?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Đã đọc',
          cancelButtonText: 'Chưa',
        }).then((result) => {
          if (result.isConfirmed) {
            this.OrderService.createOrder(obj).subscribe(data => {
              if (data) {
                this.toastService.success('Mua hàng thành công!');
                window.localStorage.removeItem('Cart');
                window.location.reload();
              } else {
                this.toastService.error('Lỗi mua hàng không thành công !!!');
              }
            });
          }else {
            window.location.reload();
          }
    });
  }
  getInforUser() {
    this.userService.getInforUser().subscribe(res => {
      if (res) {
        console.log(res);
        this.iF.hoten.setValue(res.fullname);
        this.iF.email.setValue(res.email);
        this.iF.phone.setValue(res.sodienthoai);
      }
    });
  }
}
