import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/model/cart-item';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../../service/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private roles: string[] = [];
  searchForm!: FormGroup;
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  cartItem: CartItem[] = [];
  listDataCart: any[] = [];
  totalQuantity = 0;
  nameFiles: any;
  constructor(
    private token: TokenStorageService,
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.listDataCart = JSON.parse(localStorage.getItem("Cart")!);
    this.updateCartStatus();
    this.isLoggedIn = !!this.token.getToken();
    if (this.isLoggedIn) {
      const user = this.token.getUser();
      this.roles = user.roles;
      this.getUser();
    }
    this.searchForm = this.formBuilder.group({
      search: ['']
    });
  }

  logOut(): void {
    this.token.signOut();
    window.location.reload();
  }
  updateCartStatus() {
    // subscribe to the cart totalQuantity
    this.cartService.totalQty.subscribe(data => this.totalQuantity = data);
  }
  get sf(): any {
    return this.searchForm.controls;
  }
  searchName(value: string) {
    this.router.navigateByUrl(`about/search/${value}`);
  }
  getUser() {
    this.userService.getInforUser().subscribe(res => {
      if (res) {
        this.username = res.username;
        this.nameFiles = res.image;
      }
    });
  }
}
